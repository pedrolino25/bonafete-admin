'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditCuponSection from '@/components/sections/cupons/CreateEditCuponSection'
import { Button } from '@/components/ui/button'
import { CUPON_STATUS_OPTIONS, CUPON_TYPES_OPTIONS } from '@/lib/utils/consts'
import { getCupon } from '@/services/api/cupons'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Cupon() {
  const t = useTranslations()
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { data } = useQuery({
    queryKey: ['cupon', id],
    queryFn: async () => {
      return await getCupon(id)
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
        <CreateEditCuponSection
          defaultValues={{
            id: data.id,
            type: CUPON_TYPES_OPTIONS?.filter(
              (item) => item.value === (data.type as unknown as string)
            ),
            code: data.code,
            percentage: data.percentage?.toString(),
            fixed: data.fixed?.toString(),
            minReservationValue: data.minReservationValue?.toString(),
            expirationHours: data.expirationHours?.toString(),
            status: CUPON_STATUS_OPTIONS?.filter(
              (item) => item.value === (data.status as unknown as string)
            ),
          }}
        />
      )}
    </Navbar>
  )
}
