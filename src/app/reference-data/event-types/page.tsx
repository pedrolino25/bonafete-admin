'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getSpaceTargetsList } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const EventTypesListSection = dynamic(
  () => import('@/components/sections/event-types/EventTypesListSection'),
  { ssr: false }
)

export default function ReferenceData() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['space-targets'],
    queryFn: async () => {
      return await getSpaceTargetsList()
    },
  })

  return (
    <Navbar>
      <EventTypesListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
