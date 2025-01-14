'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditServiceSection from '@/components/sections/services/CreateEditServiceSection'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function CreateServicesCategory() {
  const router = useRouter()
  const t = useTranslations()

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
      <CreateEditServiceSection />
    </Navbar>
  )
}
