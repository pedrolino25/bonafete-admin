import OrderRequestSection from '@/components/sections/order-request/OrderRequestSection'
import {
  getLocalitiesList,
  getServicesList,
  getSpaceTargetsList,
  getSpaceTypesList,
} from '@/services/api/reference-data'

export default async function OrderRequest() {
  const localitiesList = await getLocalitiesList()
  const spaceTypesList = await getSpaceTypesList()
  const spaceTargetsList = await getSpaceTargetsList()
  const servicesList = await getServicesList()
  return (
    <OrderRequestSection
      localitiesList={localitiesList}
      servicesList={servicesList}
      partyTypesList={spaceTargetsList}
      spaceTypesList={spaceTypesList}
    />
  )
}
