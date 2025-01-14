'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditServiceSection from '@/components/sections/services/CreateEditServiceSection'
import { Button } from '@/components/ui/button'
import { getService } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditServicesCategory() {
  const router = useRouter()
  const t = useTranslations()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { data } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      return await getService(id)
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
        <CreateEditServiceSection
          defaultValues={{
            id: data.id,
            key: data.key,
            value: data.value,
            category: [
              {
                value: data.serviceCategory.id,
                label: data.serviceCategory.value,
              },
            ],
          }}
        />
      )}
    </Navbar>
  )
}
