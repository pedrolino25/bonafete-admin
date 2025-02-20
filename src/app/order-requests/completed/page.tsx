'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { OrderRequestStatus } from '@/lib/utils/consts'
import { getOrderRequestsByStatusList } from '@/services/api/order-requests'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const OrderRequestsListSection = dynamic(
  () => import('@/components/sections/order-requests/OrderRequestsListSection'),
  { ssr: false }
)

export default function OrderRequests() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['order-requests', OrderRequestStatus.Completed],
    queryFn: async () => {
      return await getOrderRequestsByStatusList(OrderRequestStatus.Completed)
    },
  })

  return (
    <Navbar>
      <OrderRequestsListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
