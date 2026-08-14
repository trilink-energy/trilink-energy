import PortalNavigation from '../../components/navigation/PortalNavigation'
import SiteLayout from '../../components/layout/SiteLayout'

const modules = [
  'Customer Portal',
  'Supplier Portal',
  'TriLink Trade',
  'Logistics',
  'Energy',
  'Finance',
  'Approvals',
  'AI Platform',
  'Risk',
  'Audit',
  'Settings'
]

export default function Dashboard() {
  return (
    <SiteLayout navigation={<PortalNavigation />}>
      <h1>TriLink Dashboard</h1>

      <p>
        Central platform dashboard.
      </p>

      <section>
        <h2>Platform Modules</h2>

        <ul>
          {modules.map(module => (
            <li key={module}>{module}</li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  )
}
