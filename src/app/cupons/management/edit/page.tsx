'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditCuponSection from '@/components/sections/cupons/CreateEditCuponSection'
import { Button } from '@/components/ui/button'
import { CuponType } from '@/lib/utils/consts'
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

  const typeOptions = [
    { value: CuponType.SIGN_UP, label: t('sections.cupons.sign-up') },
    {
      value: CuponType.REFERAL_SHARE,
      label: t('sections.cupons.referal-share'),
    },
    {
      value: CuponType.REFERAL_RESERVATION,
      label: t('sections.cupons.referal-reservation'),
    },
    { value: CuponType.RESERVATION, label: t('sections.cupons.reservation') },
    { value: CuponType.REVIEW, label: t('sections.cupons.review') },
    {
      value: CuponType.FAST_RESERVATION,
      label: t('sections.cupons.fast-reservation'),
    },
    {
      value: CuponType.FAST_RESERVATION_FW,
      label: t('sections.cupons.fast-reservation-fw'),
    },
    { value: CuponType.ANNIVERSARY, label: t('sections.cupons.aniversary') },
    { value: CuponType.APPLICATION, label: t('sections.cupons.application') },
    { value: CuponType.INFLUENCER, label: t('sections.cupons.influencer') },
  ]

  const statusOptions = [
    { value: 'active', label: t('sections.cupons.active') },
    {
      value: 'inactive',
      label: t('sections.cupons.inactive'),
    },
  ]

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
            type: typeOptions?.filter(
              (item) => item.value === (data.type as unknown as string)
            ),
            code: data.code,
            percentage: data.percentage?.toString(),
            fixed: data.fixed?.toString(),
            minReservationValue: data.minReservationValue?.toString(),
            expirationHours: data.expirationHours?.toString(),
            status: statusOptions?.filter(
              (item) => item.value === (data.status as unknown as string)
            ),
          }}
        />
      )}
    </Navbar>
  )
}
