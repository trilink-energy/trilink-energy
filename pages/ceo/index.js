import { useEffect, useState } from 'react'
import CEOLayout from '../../components/ceo/CEOLayout'

const modules = [
  {
    key: 'overview',
    title: 'Overview',
    description: 'Executive command centre and system status.',
    href: '/ceo'
  },
  {
    key: 'ai',
    title: 'AI',
    description: 'AI agents, tasks, actions and approvals.',
    href: '/ceo/ai'
  },
  {
    key: 'trade',
    title: 'Trade',
    description: 'Global trade operations and transactions.',
    href: '/ceo/trade'
  },
  {
    key: 'logistics',
    title: 'Logistics',
    description: 'Shipments, routes and delivery operations.',
    href: '/ceo/logistics'
  },
  {
    key: 'energy',
    title: 'Energy',
    description: 'Energy operations, orders and supply.',
    href: '/ceo/energy'
  },
  {
    key: 'customers',
    title: 'Customers',
    description: 'Customer accounts and commercial activity.',
    href: '/ceo/customers'
  },
  {
    key: 'suppliers',
    title: 'Suppliers',
    description: 'Supplier management and relationships.',
    href: '/ceo/suppliers'
  },
  {
    key: 'finance',
    title: 'Finance',
    description: 'Invoices, payments and financial activity.',
    href: '/ceo/finance'
  },
  {
    key: 'approvals',
    title: 'Approvals',
    description: 'Pending operational and high-risk approvals.',
    href: '/ceo/approvals'
  },
  {
    key: 'risk',
    title: 'Risk',
    description: 'Risk events, alerts and controls.',
    href: '/ceo/risk'
  },
  {
    key: 'audit',
    title: 'Audit',
    description: 'System and security audit activity.',
    href: '/ceo/audit'
  },
  {
    key: 'settings',
    title: 'Settings',
    description: 'CEO and platform configuration.',
    href: '/ceo/settings'
  }
]

export default function CEODashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    fetch('/api/ceo/overview', {
      credentials: 'include'
    })
      .then(async response => {
        const body = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(
            body.error || 'CEO_OVERVIEW_FAILED'
          )
        }

        return body
      })
      .then(body => {
        if (mounted) {
          setData(body)
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message || 'CEO_OVERVIEW_FAILED')
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <CEOLayout
      title="CEO Command Centre"
      subtitle="TriLink Energy executive control system"
    >
      {error && (
        <div className="ceo-alert ceo-alert-danger">
          {error}
        </div>
      )}

      <section className="ceo-hero">
        <div>
          <span className="ceo-eyebrow">
            TRILINK ENERGY
          </span>
          <h1>CEO Command Centre</h1>
          <p>
            Executive visibility across trade, energy,
            logistics, finance, customers, suppliers and AI.
          </p>
        </div>

        <div className="ceo-status">
          <span className="status-dot" />
          <span>
            {data?.database === 'reachable'
              ? 'Database reachable'
              : 'Checking system'}
          </span>
        </div>
      </section>

      <section className="ceo-stat-grid">
        <Stat
          title="Customers"
          value={data?.counts?.customers}
        />
        <Stat
          title="Suppliers"
          value={data?.counts?.suppliers}
        />
        <Stat
          title="Orders"
          value={data?.counts?.orders}
        />
        <Stat
          title="Invoices"
          value={data?.counts?.invoices}
        />
        <Stat
          title="Payments"
          value={data?.counts?.payments}
        />
        <Stat
          title="Approvals"
          value={data?.counts?.approvals}
        />
      </section>

      <section>
        <div className="section-heading">
          <div>
            <h2>Command Modules</h2>
            <p>
              Select an operational area.
            </p>
          </div>
        </div>

        <div className="ceo-module-grid">
          {modules.map(module => (
            <a
              key={module.key}
              href={module.href}
              className="ceo-module-card"
            >
              <div className="module-icon">
                {module.title.slice(0, 1)}
              </div>

              <div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>

              <span className="module-arrow">
                →
              </span>
            </a>
          ))}
        </div>
      </section>
    </CEOLayout>
  )
}

function Stat({ title, value }) {
  return (
    <div className="ceo-stat">
      <span>{title}</span>
      <strong>
        {typeof value === 'number' ? value : '—'}
      </strong>
    </div>
  )
}
