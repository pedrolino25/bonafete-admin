'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { HostStatus } from '@/lib/utils/consts'
import { HostResponse } from '@/services/api/hosts'
import { LinkIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ReservationsListSection from './reservations-list/ReservationsListSection'
import SpacesListSection from './spaces-list/SpacesListSection'

interface HostSectionProps {
  data: HostResponse
  refetch?: () => void
}

export default function HostSection({ data, refetch }: HostSectionProps) {
  const t = useTranslations()
  return (
    <div className="w-full px-1">
      <div className="px-6 w-full">
        <div className="border-b py-6 w-full">
          <h2 className="text-2xl font-bold text-utility-brand-600">
            {t('sections.host.host-title')}
          </h2>
          <p className="text-utility-gray-500 text-sm font-light pt-1">
            {t('sections.host.host-subtitle')}
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
                <div className="w-full">
                  <p className="text-sm font-light text-utility-gray-500">
                    {t('host-section.company-type')}
                  </p>
                  <p className="text-base font-medium text-utility-brand-600 pt-1">
                    <Badge shape="square" color="brand">
                      {t(`business_type.${data.type}`)}
                    </Badge>
                  </p>
                </div>
              </div>
              <div className="w-full text-clip flex flex-col gap-4">
                <div className="w-full">
                  <p className="text-sm font-light text-utility-gray-500">
                    {t('host-section.email')}
                  </p>
                  <p className="text-base font-medium text-utility-brand-600">
                    {data.email}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-light text-utility-gray-500">
                    {t('host-section.status')}
                  </p>
                  <p className="text-base font-medium text-utility-brand-600 pt-1">
                    <Badge
                      shape="square"
                      color={
                        data.status === HostStatus.Active
                          ? 'success'
                          : data.status === HostStatus.Pending
                          ? 'blue'
                          : data.status === HostStatus.Archived
                          ? 'warning'
                          : data.status === HostStatus.Suspended
                          ? 'error'
                          : 'brand'
                      }
                    >
                      {t(`host-status.${data.status}`)}
                    </Badge>
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <div>
                  <p className="text-sm font-light text-utility-gray-500">
                    {t('host-section.phone')}
                  </p>
                  <p className="text-base font-medium text-utility-brand-600">
                    {data.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-light text-utility-gray-500">
                    {t('host-section.stripe-account')}
                  </p>
                  <p>
                    <a
                      target="_blank"
                      href={`https://dashboard.stripe.com/connect/accounts/${data.account_id}/activity`}
                    >
                      <div className="flex gap-2 items-center">
                        <span>{data.account_id}</span>
                        <LinkIcon className="h-3.5 w-3.5" />
                      </div>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-4 flex flex-col gap-8 pr-6 pb-12 max-sm:pr-2">
        <SpacesListSection data={data.spaces} refetch={refetch} />
        <ReservationsListSection data={data.reservations} refetch={refetch} />
      </div>
    </div>
  )
}
