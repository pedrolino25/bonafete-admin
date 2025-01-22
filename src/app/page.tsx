'use client'
import PartyTypesChart from '@/components/charts/party-types-chart'
import ReservationsChart from '@/components/charts/reservations-chart'
import ReservationsTotalCard from '@/components/charts/reservations-total-card'
import RevenueChart from '@/components/charts/revenue-chart'
import RevenueTotalCard from '@/components/charts/revenue-total-card'
import SpacesTotalCard from '@/components/charts/spaces-total-card'
import UsersTotalCard from '@/components/charts/users-total-card'
import { Navbar } from '@/components/navigation/Navbar'
import { getAdminStatistics } from '@/services/api/statistics'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      return await getAdminStatistics()
    },
  })

  return (
    <Navbar>
      <main>
        <div className="p-4">
          <div className="grid grid-cols-4 max-sm:grid-cols-1 max-sm:w-full gap-6">
            {data?.users && <UsersTotalCard data={data?.users} />}
            {data?.spaces && <SpacesTotalCard data={data?.spaces} />}
            {data?.reservations && (
              <ReservationsTotalCard data={data?.reservations} />
            )}
            {data?.revenue && <RevenueTotalCard data={data?.revenue} />}
          </div>
          <div className="grid grid-cols-5 max-sm:grid-cols-1 w-full gap-6 pt-6">
            <div className="col-span-5 max-sm:col-span-1">
              <RevenueChart data={data?.revenue} />
            </div>
          </div>
          <div className="grid grid-cols-5 max-sm:grid-cols-1 w-full gap-6 pt-6">
            <div className="col-span-3 max-sm:col-span-1">
              <ReservationsChart data={data?.reservations} />
            </div>
            <div className="col-span-2 max-sm:col-span-1">
              <PartyTypesChart data={data?.targets} />
            </div>
          </div>
        </div>
      </main>
    </Navbar>
  )
}
