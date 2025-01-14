'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { HostStatus } from '@/lib/utils/consts'
import { getHostsListByStatus } from '@/services/api/hosts'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const HostsListSection = dynamic(
  () => import('@/components/sections/hosts/HostsListSection'),
  { ssr: false }
)

export default function Hosts() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['hosts', HostStatus.Active],
    queryFn: async () => {
      return await getHostsListByStatus(HostStatus.Active)
    },
  })

  return (
    <Navbar>
      <HostsListSection data={data} isPending={isPending} refresh={refetch} />
    </Navbar>
  )
}
