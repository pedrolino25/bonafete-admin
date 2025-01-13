'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditLocalitySection from '@/components/sections/localities/CreateEditLocalitySection'
import { Button } from '@/components/ui/button'
import { getLocality } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditLocality() {
  const router = useRouter()
  const t = useTranslations()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { data } = useQuery({
    queryKey: ['country', id],
    queryFn: async () => {
      return await getLocality(id)
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
      {data && data.id && (
        <CreateEditLocalitySection
          defaultValues={{
            id: data.id,
            title: data.title,
            latitude: data.latitude.toString(),
            longitude: data.longitude.toString(),
            radius: data.radius.toString(),
            url: data.url,
          }}
        />
      )}
    </Navbar>
  )
}
