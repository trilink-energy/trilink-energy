import PortalNavigation from '../../components/navigation/PortalNavigation'
import SiteLayout from '../../components/layout/SiteLayout'

export default function Portal() {
  return (
    <SiteLayout navigation={<PortalNavigation />}>
      <h1>TriLink Portal</h1>

      <p>
        Unified access point for customers,
        suppliers and business operations.
      </p>

      <div>
        <p>Customer services</p>
        <p>Supplier services</p>
        <p>Trade services</p>
        <p>Logistics services</p>
        <p>Energy services</p>
      </div>
    </SiteLayout>
  )
}
