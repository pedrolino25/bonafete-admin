'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getSpaceTypesList } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const SpaceTypesListSection = dynamic(
  () => import('@/components/sections/space-types/SpaceTypesListSection'),
  { ssr: false }
)

export default function ReferenceData() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['space-types'],
    queryFn: async () => {
      return await getSpaceTypesList()
    },
  })

  return (
    <Navbar>
      <SpaceTypesListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
