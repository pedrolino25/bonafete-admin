'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditConvenienceSection from '@/components/sections/conveniences/CreateEditConvenienceSection'
import { Button } from '@/components/ui/button'
import { getSpaceConvenience } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditConvenience() {
  const router = useRouter()
  const t = useTranslations()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { data } = useQuery({
    queryKey: ['convenience', id],
    queryFn: async () => {
      return await getSpaceConvenience(id)
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
        <CreateEditConvenienceSection
          defaultValues={{
            id: data.id,
            label: data.label,
            type: data.type,
            image: data.image,
          }}
        />
      )}
    </Navbar>
  )
}
