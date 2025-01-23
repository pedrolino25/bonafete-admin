'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditCuponSection from '@/components/sections/cupons/CreateEditCuponSection'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function Cupon() {
  const t = useTranslations()
  const router = useRouter()

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
      <CreateEditCuponSection />
    </Navbar>
  )
}
