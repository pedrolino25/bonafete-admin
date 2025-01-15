'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getAvailabilityVerificationsList } from '@/services/api/reservations'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const AvailabilityVerificationsListSection = dynamic(
  () =>
    import(
      '@/components/sections/availability-verifications/AvailabilityVerificationsListSection'
    ),
  { ssr: false }
)

export default function Reservations() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['availability-verifications'],
    queryFn: async () => {
      return await getAvailabilityVerificationsList()
    },
  })

  return (
    <Navbar>
      <AvailabilityVerificationsListSection
        data={data}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
