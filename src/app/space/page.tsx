import EditSpaceSection from '@/components/sections/edit-space/EditSpaceSection'
import {
  getLocalitiesList,
  getPostalCodesList,
  getSpaceConveniencesList,
  getSpaceTargetsList,
  getSpaceTypesList,
} from '@/services/api/reference-data'

export default async function SpaceData() {
  const localitiesList = await getLocalitiesList()
  const conveniencesList = await getSpaceConveniencesList()
  const spaceTypesList = await getSpaceTypesList()
  const spaceTargetsList = await getSpaceTargetsList()
  const postalCodesList = await getPostalCodesList()

  return (
    <EditSpaceSection
      localitiesList={localitiesList}
      conveniencesList={conveniencesList}
      spaceTypesList={spaceTypesList}
      spaceTargetsList={spaceTargetsList}
      postalCodesList={postalCodesList}
    />
  )
}
