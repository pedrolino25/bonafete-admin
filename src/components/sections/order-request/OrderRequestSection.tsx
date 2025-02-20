'use client'

import { Navbar } from '@/components/navigation/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { splitCommaGetFirst } from '@/lib/utils'
import { getOrderRequest } from '@/services/api/order-requests'
import {
  LocalityListItemResponse,
  ServicesListItemResponse,
  SpaceTargetListItemResponse,
  SpaceTypeListItemResponse,
} from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import AvailableOffersListSection from './available-offers-list/AvailableOffersListSection'

interface OrderRequestSectionProps {
  localitiesList: LocalityListItemResponse[]
  servicesList: ServicesListItemResponse[]
  partyTypesList: SpaceTargetListItemResponse[]
  spaceTypesList: SpaceTypeListItemResponse[]
}

export default function OrderRequestSection({
  localitiesList,
  servicesList,
  partyTypesList,
  spaceTypesList,
}: OrderRequestSectionProps) {
  const t = useTranslations()
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id') as string

  const { data, refetch } = useQuery({
    queryKey: ['order-request', id],
    queryFn: async () => {
      return await getOrderRequest(id)
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
      {data && (
        <div className="w-full px-1">
          <div className="px-6 w-full">
            <div className="border-b py-6 w-full">
              <h2 className="text-2xl font-bold text-utility-brand-600">
                {t('sections.order-request.title')}
              </h2>
              <p className="text-utility-gray-500 text-sm font-light pt-1">
                {t('sections.order-request.subtitle')}
              </p>
            </div>
          </div>
          <div className="px-6 w-full">
            <div className="border-b py-6 w-full">
              <div className="w-full flex gap-4 max-sm:pr-8">
                <div className="w-48 flex justify-center items-start ">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={data.user_picture} />
                    <AvatarFallback>
                      {data.user_name?.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="w-full flex flex-col">
                  <div className="w-full flex max-sm:flex-col gap-12 max-sm:gap-4">
                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500 ">
                          {t('host-section.name')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {data.user_name}
                        </p>
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500">
                          {t('host-section.email')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {data.user_email}
                        </p>
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500">
                          {t('host-section.phone')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {data.user_phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="w-full flex max-sm:flex-col gap-12 max-sm:gap-4">
                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500">
                          {t('columns.party_type')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {data.party_type}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500">
                          {t('columns.date-time')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {`${data.date}, ${data.time_init} - ${data.time_end}`}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500">
                          {t('columns.number_of_persons')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {data.number_of_persons}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex max-sm:flex-col pt-4 gap-12 max-sm:gap-4">
                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500">
                          {t('columns.locality')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {splitCommaGetFirst(data.locality)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500">
                          {t('columns.services')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {data.services?.length > 0 ? (
                            <ul>
                              {data.services?.map((item) => {
                                return <li>{`- ${item.label}`}</li>
                              })}
                            </ul>
                          ) : (
                            'N/A'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <p className="text-sm font-light text-utility-gray-500">
                          {t('columns.created_at')}
                        </p>
                        <p className="text-base font-medium text-utility-brand-600">
                          {data.created_at}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full pt-4 flex flex-col gap-8 pr-6 pb-12 max-sm:pr-2">
            {data && (
              <AvailableOffersListSection
                orderRequest={data}
                localitiesList={localitiesList}
                servicesList={servicesList}
                partyTypesList={partyTypesList}
                spaceTypesList={spaceTypesList}
              />
            )}
          </div>
        </div>
      )}
    </Navbar>
  )
}
