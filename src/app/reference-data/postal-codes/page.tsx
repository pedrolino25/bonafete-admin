'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { getPostalCodesList } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
const PostalCodesListSection = dynamic(
  () => import('@/components/sections/postal-codes/PostalCodesListSection'),
  { ssr: false }
)

export default function ReferenceData() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['postal-codes'],
    queryFn: async () => {
      return await getPostalCodesList()
    },
  })

  return (
    <Navbar>
      <PostalCodesListSection
        data={data?.map((item) => {
          return { ...item, postal_code: item.postalCode }
        })}
        isPending={isPending}
        refresh={refetch}
      />
    </Navbar>
  )
}
