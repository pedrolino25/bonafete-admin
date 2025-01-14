'use client'

import { Navbar } from '@/components/navigation/Navbar'
import ClientSection from '@/components/sections/client/ClientSection'
import { Button } from '@/components/ui/button'
import { getClient } from '@/services/api/hosts'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Client() {
  const t = useTranslations()
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { isPending, data, refetch } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      return await getClient(id)
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
      {data && <ClientSection data={data} refetch={refetch} />}
    </Navbar>
  )
}
