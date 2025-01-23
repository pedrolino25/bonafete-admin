'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getAniversaryCuponsList } from '@/services/api/cupons'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const AniversaryCuponsListSection = dynamic(
  () => import('@/components/sections/cupons/AniversaryCuponsListSection'),
  { ssr: false }
)

export default function Cupons() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['cupons-aniversary'],
    queryFn: async () => {
      return await getAniversaryCuponsList()
    },
  })

  return (
    <Navbar>
      <AniversaryCuponsListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
