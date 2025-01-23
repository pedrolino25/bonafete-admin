'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getCuponsList } from '@/services/api/cupons'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const CuponsListSection = dynamic(
  () => import('@/components/sections/cupons/CuponsListSection'),
  { ssr: false }
)

export default function Cupons() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['cupons-list'],
    queryFn: async () => {
      return await getCuponsList()
    },
  })

  return (
    <Navbar>
      <CuponsListSection data={data} isPending={isPending} refresh={refetch} />
    </Navbar>
  )
}
