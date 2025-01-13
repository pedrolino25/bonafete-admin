'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditPostalCodeSection from '@/components/sections/postal-codes/CreateEditPostalCodesSection'
import { Button } from '@/components/ui/button'
import { getPostalCode } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditPostalCode() {
  const router = useRouter()
  const t = useTranslations()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { data } = useQuery({
    queryKey: ['postal-code', id],
    queryFn: async () => {
      return await getPostalCode(id)
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
        <CreateEditPostalCodeSection
          defaultValues={{
            id: data.id,
            city: data.city,
            locality: data.locality,
            postal_code: data.postalCode,
            latitude: data.latitude.toString(),
            longitude: data.longitude.toString(),
          }}
        />
      )}
    </Navbar>
  )
}
