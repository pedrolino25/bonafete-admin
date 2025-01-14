'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditSpaceTypeSection from '@/components/sections/space-types/CreateEditSpaceTypeSection'
import { Button } from '@/components/ui/button'
import { getSpaceType } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditSpaceType() {
  const router = useRouter()
  const t = useTranslations()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { data } = useQuery({
    queryKey: ['space-type', id],
    queryFn: async () => {
      return await getSpaceType(id)
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
        <CreateEditSpaceTypeSection
          defaultValues={{
            id: data.id,
            label: data.label,
            image: data.image,
          }}
        />
      )}
    </Navbar>
  )
}
