'use client'

import { Navbar } from '@/components/navigation/Navbar'
import CreateEditEventTypeSection from '@/components/sections/event-types/CreateEditEventTypeSection'
import { Button } from '@/components/ui/button'
import { getSpaceTarget } from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditEventType() {
  const router = useRouter()
  const t = useTranslations()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { data } = useQuery({
    queryKey: ['event-type', id],
    queryFn: async () => {
      return await getSpaceTarget(id)
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
        <CreateEditEventTypeSection
          defaultValues={{
            id: data.id,
            label: data.label,
            description: data.description,
            url: data.url,
          }}
        />
      )}
    </Navbar>
  )
}
