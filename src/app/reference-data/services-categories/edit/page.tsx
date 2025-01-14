'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditServiceCategorySection from '@/components/sections/services-categories/CreateEditServiceCategorySection'
import { Button } from '@/components/ui/button'
import { getServicesCategory } from '@/services/api/reference-data'
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
    queryKey: ['service-category', id],
    queryFn: async () => {
      return await getServicesCategory(id)
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
        <CreateEditServiceCategorySection
          defaultValues={{
            id: data.id,
            key: data.key,
            value: data.value,
          }}
        />
      )}
    </Navbar>
  )
}
