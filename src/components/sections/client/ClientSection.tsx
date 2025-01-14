'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ClientResponse } from '@/services/api/hosts'
import { useTranslations } from 'next-intl'
import ReservationsListSection from './reservations-list/ReservationsListSection'

interface ClientSectionProps {
  data: ClientResponse
  refetch?: () => void
}

export default function ClientSection({ data, refetch }: ClientSectionProps) {
  const t = useTranslations()
  return (
    <div className="w-full px-1">
      <div className="px-6 w-full">
        <div className="border-b py-6 w-full">
          <h2 className="text-2xl font-bold text-utility-brand-600">
            {t('sections.client.client-title')}
          </h2>
          <p className="text-utility-gray-500 text-sm font-light pt-1">
            {t('sections.client.client-subtitle')}
          </p>
        </div>
      </div>
      <div className="px-6 w-full">
        <div className="border-b py-6 w-full">
          <div className="w-full flex gap-4 max-sm:pr-8">
            <div className="w-48 flex items-center justify-center max-sm:items-start ">
              <Avatar className="h-20 w-20">
                <AvatarImage src={data.picture} />
                <AvatarFallback>{data.name?.substring(0, 1)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex max-sm:flex-col gap-12 max-sm:gap-4">
              <div className="w-full flex flex-col gap-4">
                <div className="w-full">
                  <p className="text-sm font-light text-utility-gray-500 ">
                    {t('host-section.name')}
                  </p>
                  <p className="text-base font-medium text-utility-brand-600">
                    {data.name}
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="w-full">
                  <p className="text-sm font-light text-utility-gray-500">
                    {t('host-section.email')}
                  </p>
                  <p className="text-base font-medium text-utility-brand-600">
                    {data.email}
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="w-full">
                  <p className="text-sm font-light text-utility-gray-500">
                    {t('host-section.phone')}
                  </p>
                  <p className="text-base font-medium text-utility-brand-600">
                    {data.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-4 flex flex-col gap-8 pr-6 pb-12 max-sm:pr-2">
        <ReservationsListSection data={data.reservations} refetch={refetch} />
      </div>
    </div>
  )
}
