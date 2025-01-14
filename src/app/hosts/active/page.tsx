'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getHostsListByStatus, HostsStatus } from '@/services/api/hosts'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const HostsListSection = dynamic(
  () => import('@/components/sections/hosts/HostsListSection'),
  { ssr: false }
)

export default function Hosts() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['hosts', HostsStatus.Active],
    queryFn: async () => {
      return await getHostsListByStatus(HostsStatus.Active)
    },
  })

  return (
    <Navbar>
      <HostsListSection data={data} isPending={isPending} refresh={refetch} />
    </Navbar>
  )
}
