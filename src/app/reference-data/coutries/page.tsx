'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getCountriesList } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const CountriesListSection = dynamic(
  () => import('@/components/sections/countries/CountriesListSection'),
  { ssr: false }
)

export default function ReferenceData() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      return await getCountriesList()
    },
  })

  return (
    <Navbar>
      <CountriesListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
