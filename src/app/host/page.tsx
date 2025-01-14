'use client'

import { Navbar } from '@/components/navigation/Navbar'
import HostSection from '@/components/sections/host/HostSection'
import { Button } from '@/components/ui/button'
import { getHost } from '@/services/api/hosts'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'

const HostsListSection = dynamic(
  () => import('@/components/sections/hosts/HostsListSection'),
  { ssr: false }
)

export default function Host() {
  const t = useTranslations()
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { isPending, data, refetch } = useQuery({
    queryKey: ['host', id],
    queryFn: async () => {
      return await getHost(id)
    },
  })

  return (
    <Navbar
      topbarActions={
        <Button
          color="secondary"
          startAdornment={<ChevronLeft className="h-4 w-4" />}
          variant="ghost"
          onClick={() => router.back()}
        >
          {t('navigation.back')}
        </Button>
      }
    >
      {data && <HostSection data={data} refetch={refetch} />}
    </Navbar>
  )
}
