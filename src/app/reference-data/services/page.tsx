'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getServicesList } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const ServiceListSection = dynamic(
  () => import('@/components/sections/services/ServiceListSection'),
  { ssr: false }
)

export default function ReferenceData() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      return await getServicesList()
    },
  })

  return (
    <Navbar>
      <ServiceListSection
        data={data?.map((item) => {
          return {
            ...item,
            category: item.serviceCategory.value,
          }
        })}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
