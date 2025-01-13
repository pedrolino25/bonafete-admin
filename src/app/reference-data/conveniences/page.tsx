'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getSpaceConveniencesList } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const ConveniencesListSection = dynamic(
  () => import('@/components/sections/conveniences/ConveniencesListSection'),
  { ssr: false }
)

export default function ReferenceData() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['conveniences'],
    queryFn: async () => {
      return await getSpaceConveniencesList()
    },
  })

  return (
    <Navbar>
      <ConveniencesListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
