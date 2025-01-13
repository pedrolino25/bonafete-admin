'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getServicesCategoriesList } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const ServiceCategoriesListSection = dynamic(
  () =>
    import(
      '@/components/sections/services-categories/ServiceCategoriesListSection'
    ),
  { ssr: false }
)

export default function ReferenceData() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['services-categories'],
    queryFn: async () => {
      return await getServicesCategoriesList()
    },
  })

  return (
    <Navbar>
      <ServiceCategoriesListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
