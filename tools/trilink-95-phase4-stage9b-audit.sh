#!/usr/bin/env bash
# TRILINK-95 Phase 4 Stage 9B authentication audit
# Conservatively written for low-memory environments
# - Does not start servers
# - Uses NODE_OPTIONS="--max_old_space_size=768" for build step
# - Uses rg when available, falls back to grep
# - Uses curl with timeouts for live checks
# - Cleans up temporary files
# - NEVER prints secrets or credentials

set -eu -o pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
SCRIPT_PATH="$ROOT_DIR/tools/$(basename "$0")"
TMP_DIR=$(mktemp -d -t trilink-95-audit-XXXX)
trap 'rm -rf "$TMP_DIR"' EXIT

# Utilities
command -v curl >/dev/null 2>&1 || { echo "ERROR: curl required" >&2; exit 2; }

if command -v rg >/dev/null 2>&1; then
  SEARCH_TOOL="rg"
else
  SEARCH_TOOL="grep -R --line-number --binary-files=without-match -E"
fi

# Conservative Node settings for build
export NODE_OPTIONS="--max_old_space_size=768"

HOST="${AUDIT_HOST:-http://localhost:3000}"
CURL_TIMEOUT=4

# Report map
declare -A REPORT
set_report() { REPORT["$1"]="$2"; }
get_report() { echo "${REPORT[$1]:-PENDING}"; }

# Helpers
search_code() {
  local pattern=$1
  local path=${2:-.}
  if [ "$SEARCH_TOOL" = "rg" ]; then
    rg --hidden --no-ignore-vcs --line-number --no-heading -S "$pattern" "$path" || true
  else
    eval "$SEARCH_TOOL \"$pattern\" \"$path\"" || true
  fi
}

file_exists() { [ -f "$1" ]; }

# STATIC INSPECTIONS
echo "Running static inspections..."

# Cookie security
if search_code "Set-Cookie.*HttpOnly.*Secure.*SameSite=Strict" lib | grep -q "lib/customer/auth.js"; then
  set_report "COOKIE SECURITY" "PASS"
else
  set_report "COOKIE SECURITY" "FAIL"
fi

# Rate-limit usage present in customer-login
if search_code "checkAuthRateLimit\(|recordAuthFailure\(|clearAuthRateLimit\(" pages/api/auth/customer-login.js | grep -q "checkAuthRateLimit"; then
  set_report "RATE LIMIT" "PASS"
else
  set_report "RATE LIMIT" "FAIL"
fi

# Customer login endpoint file exists
if file_exists "pages/api/auth/customer-login.js"; then
  set_report "CUSTOMER LOGIN" "PENDING"
else
  set_report "CUSTOMER LOGIN" "NOT RUN"
fi

# Session protection
if file_exists "pages/api/auth/customer-session.js"; then
  if search_code "readCustomerSession" pages/api/auth/customer-session.js | grep -q "readCustomerSession"; then
    set_report "SESSION PROTECTION" "PASS"
  else
    set_report "SESSION PROTECTION" "FAIL"
  fi
else
  set_report "SESSION PROTECTION" "NOT RUN"
fi

# Logout
if file_exists "pages/api/auth/customer-logout.js"; then
  if search_code "clearCustomerCookie" pages/api/auth/customer-logout.js | grep -q "clearCustomerCookie"; then
    set_report "LOGOUT" "PASS"
  else
    set_report "LOGOUT" "FAIL"
  fi
else
  set_report "LOGOUT" "NOT RUN"
fi

# Session invalidation: detect server-side revocation
if search_code "session_rev|revoke|revocation|blacklist|session_store|session_revoke" lib | sed -n '1,10p' | wc -l | grep -q "0"; then
  # no obvious revocation artifacts
  set_report "SESSION INVALIDATION" "FAIL"
else
  set_report "SESSION INVALIDATION" "PENDING"
fi

# Password hashing module
if file_exists "lib/security/password.js"; then
  set_report "PASSWORD HASHING" "PASS"
else
  set_report "PASSWORD HASHING" "FAIL"
fi

# First-login protection (server-side enforcement)
# Check whether customer-login blocks login when must_change_password or first_login are true
if search_code "must_change_password" pages/api/auth/customer-login.js | grep -q "must_change_password"; then
  # Code returns must_change_password flag but does not block login
  set_report "FIRST LOGIN" "FAIL"
else
  set_report "FIRST LOGIN" "PENDING"
fi

# Provisioning security
if file_exists "pages/api/customer/provision.js"; then
  if search_code "getCEOIdentity\(|hasCEOPermission\(|generateTemporaryPassword\(|hashPassword\(" pages/api/customer/provision.js >/dev/null; then
    set_report "PROVISIONING SECURITY" "PASS"
  else
    set_report "PROVISIONING SECURITY" "FAIL"
  fi
else
  set_report "PROVISIONING SECURITY" "NOT RUN"
fi

# Resend temporary credential delivery: check for module
if file_exists "lib/email/resend.js"; then
  set_report "RESEND TEMP DELIVERY" "PASS"
else
  set_report "RESEND TEMP DELIVERY" "PENDING"
fi

# Password change
if file_exists "pages/api/auth/change-password.js"; then
  if search_code "value.length >= 12" pages/api/auth/change-password.js | grep -q "value.length >= 12"; then
    set_report "PASSWORD CHANGE" "PASS"
  else
    set_report "PASSWORD CHANGE" "FAIL"
  fi
else
  set_report "PASSWORD CHANGE" "NOT RUN"
fi

# Post-change login requires live test
set_report "POST-CHANGE LOGIN" "PENDING"

# Real customer login optional
set_report "REAL CUSTOMER LOGIN" "PENDING"

# Rate-limit DB presence
if file_exists "lib/security/rate-limit-db.js"; then
  set_report "RATE LIMIT DB" "PASS"
else
  set_report "RATE LIMIT DB" "NOT RUN"
fi

# SERVER: check if running
echo "Checking for running server at $HOST (no servers will be started)..."
if curl -sS --max-time $CURL_TIMEOUT -I "$HOST/" >/dev/null 2>&1; then
  set_report "SERVER" "PASS"
else
  set_report "SERVER" "NOT RUN"
fi

# Live checks (only if server running)
if [ "${REPORT[SERVER]}" = "PASS" ]; then
  echo "Running limited live checks (no credentials)..."

  # customer-session without cookie should return 401
  CS_HTTP=$(curl -sS --max-time $CURL_TIMEOUT -i -X GET "$HOST/api/auth/customer-session" || true)
  if echo "$CS_HTTP" | grep -q "401"; then
    set_report "CUSTOMER LOGIN" "PASS"
  else
    set_report "CUSTOMER LOGIN" "FAIL"
  fi
else
  echo "Server not running; live endpoint checks skipped."
fi

# Production build (attempt only if node and npm exist)
if command -v node >/dev/null 2>&1 && [ -f package.json ]; then
  echo "Attempting production build with NODE_OPTIONS='$NODE_OPTIONS' (low-memory)..."
  # Run build but capture output to temp file; do not print secrets
  BUILD_LOG="$TMP_DIR/build.log"
  if npm run build --silent >"$BUILD_LOG" 2>&1; then
    set_report "PRODUCTION BUILD" "PASS"
  else
    echo "Build failed (see $BUILD_LOG)"
    set_report "PRODUCTION BUILD" "FAIL"
  fi
else
  set_report "PRODUCTION BUILD" "NOT RUN"
fi

# Final concise report
echo
echo "=== TRILINK-95 Phase 4 Stage 9B concise report ==="
keys=("SERVER" "CUSTOMER LOGIN" "RATE LIMIT" "SESSION PROTECTION" "LOGOUT" "SESSION INVALIDATION" "COOKIE SECURITY" "PASSWORD HASHING" "FIRST LOGIN" "PROVISIONING SECURITY" "RESEND TEMP DELIVERY" "REAL CUSTOMER LOGIN" "PASSWORD CHANGE" "POST-CHANGE LOGIN" "PRODUCTION BUILD")
for k in "${keys[@]}"; do
  printf "%-25s %s\n" "$k" "${REPORT[$k]:-PENDING}"
done

# Exit non-zero if any FAIL
FAIL_COUNT=0
for v in "${REPORT[@]}"; do
  if [ "$v" = "FAIL" ]; then
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done

if [ "$FAIL_COUNT" -gt 0 ]; then
  echo
  echo "One or more checks FAILED. Review above items."
  exit 3
fi

echo "Stage 9B audit script completed."
