import AdminNavigation from '../../components/navigation/AdminNavigation'
import SiteLayout from '../../components/layout/SiteLayout'

export default function Administration() {
  return (
    <SiteLayout navigation={<AdminNavigation />}>
      <h1>TriLink Administration</h1>

      <p>
        Controlled administration surface for
        authorized platform operators.
      </p>

      <section>
        <h2>Administration Areas</h2>

        <ul>
          <li>Settings</li>
          <li>Risk</li>
          <li>Audit</li>
          <li>Security</li>
        </ul>
      </section>
    </SiteLayout>
  )
}
