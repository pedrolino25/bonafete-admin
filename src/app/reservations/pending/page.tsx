'use client'

import { Navbar } from '@/components/navigation/Navbar'
import {
  getReservationsList,
  ReservationStatus,
} from '@/services/api/reservations'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const ReservationsListSection = dynamic(
  () => import('@/components/sections/reservations/ReservationsListSection'),
  { ssr: false }
)

export default function Reservations() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['reservations', ReservationStatus.CancelledByClient],
    queryFn: async () => {
      return await getReservationsList(ReservationStatus.CancelledByClient)
    },
  })

  return (
    <Navbar>
      <ReservationsListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
