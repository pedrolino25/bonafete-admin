'use client'

import { AvailableOffersListFilterMenuFilterMenu } from '@/components/menus/AvailableOffersListFilterMenu'
import { DataTable } from '@/components/table/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HOURS } from '@/lib/utils/consts'
import {
  getAvailableOffers,
  GetAvailableOffersResponse,
  GetOrderRequestResponse,
} from '@/services/api/order-requests'
import {
  LocalityListItemResponse,
  ServicesListItemResponse,
  SpaceTargetListItemResponse,
  SpaceTypeListItemResponse,
} from '@/services/api/reference-data'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface AvailableOffersListSectionProps {
  orderRequest: GetOrderRequestResponse
  localitiesList: LocalityListItemResponse[]
  servicesList: ServicesListItemResponse[]
  partyTypesList: SpaceTargetListItemResponse[]
  spaceTypesList: SpaceTypeListItemResponse[]
}

export default function AvailableOffersListSection({
  orderRequest,
  localitiesList,
  servicesList,
  partyTypesList,
  spaceTypesList,
}: AvailableOffersListSectionProps) {
  const t = useTranslations()
  const [filters, setFilters] = React.useState<string[]>([
    'a',
    'b',
    'c',
    'd',
    'e',
  ])
  const [openFilters, setOpenFilters] = React.useState<boolean>(false)

  const { data, refetch } = useQuery({
    queryKey: ['available-offers-list'],
    queryFn: async () => {
      return await getAvailableOffers(filters?.join(','))
    },
  })

  const columns: ColumnDef<GetAvailableOffersResponse>[] = [
    {
      accessorKey: 'space_id',
      id: 'space_id',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.id')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
    },

    {
      accessorKey: 'space_name',
      id: 'space_name',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.space_name')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data: data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
  })

  return (
    <div className="w-full pl-6 max-sm:pl-2">
      <div className="w-full px-1 pb-6 border rounded-xl">
        <div className="w-full flex justify-between items-center pr-4">
          <p className="text-lg font-bold pl-6 pb-4 pt-6 text-utility-brand-600">
            {t('titles.available-offers-list')}
          </p>
          <div className="flex gap-6 items-center">
            <span className="font-normal text-sm">{`${t(
              'table.results'
            )} ${table.getRowCount()}`}</span>
            <Button
              color="secondary"
              startAdornment={<Filter className="h-4 w-4" />}
              endAdornment={<Badge color="blue_light">{filters.length}</Badge>}
              data-testid="filters-button"
              onClick={() => setOpenFilters(true)}
            >
              <span className="max-sm:hidden">{t('table.filters')}</span>
            </Button>
          </div>
        </div>
        <DataTable.Table
          table={table}
          columns={columns}
          isLoading={false}
          className="max-h-[370px]"
        />
        <AvailableOffersListFilterMenuFilterMenu
          localitiesList={localitiesList}
          servicesList={servicesList}
          partyTypesList={partyTypesList}
          spaceTypesList={spaceTypesList}
          open={openFilters}
          onOpenChange={setOpenFilters}
          submit={() => {}}
          defaultValues={{
            locality: localitiesList
              ?.filter((locality) => locality.title === orderRequest.locality)
              ?.map((item) => {
                return {
                  value: item.id,
                  label: item.title,
                }
              }),
            party_type: partyTypesList
              ?.filter(
                (partyType) => partyType.label === orderRequest.party_type
              )
              ?.map((item) => {
                return {
                  value: item.id,
                  label: item.label,
                }
              }),
            services: orderRequest.services?.map((item) => {
              return {
                value: item.id,
                label: item.label,
              }
            }),
            nr_persons: orderRequest.number_of_persons,
            time_init: HOURS.filter(
              (item) => item.value === orderRequest.time_init
            ),
            time_end: HOURS.filter(
              (item) => item.value === orderRequest.time_end
            ),
            date: new Date(
              parseInt(orderRequest.date.split('/')[2]),
              parseInt(orderRequest.date.split('/')[1]) - 1,
              parseInt(orderRequest.date.split('/')[0])
            ),
          }}
        />
      </div>
    </div>
  )
}
