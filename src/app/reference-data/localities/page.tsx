'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getLocalitiesList } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const LocalitiesListSection = dynamic(
  () => import('@/components/sections/localities/LocalitiesListSection'),
  { ssr: false }
)

export default function ReferenceData() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['localities'],
    queryFn: async () => {
      return await getLocalitiesList()
    },
  })

  return (
    <Navbar>
      <LocalitiesListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
