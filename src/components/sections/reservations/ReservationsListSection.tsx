'use client'

import { TextInput } from '@/components/inputs/text-input/text-input'
import { DataTable } from '@/components/table/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ReservationStatus } from '@/lib/utils/consts'
import { GetReservationsItemResponse } from '@/services/api/reservations'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Link as NavigationLink,
  Search,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface ReservationsListSectionProps {
  data: GetReservationsItemResponse[] | undefined
  isPending: boolean
  refresh: () => void
}

export default function ReservationsListSection({
  data,
  isPending,
  refresh,
}: ReservationsListSectionProps) {
  const t = useTranslations()
  const router = useRouter()
  const [selected, setSelected] = React.useState<GetReservationsItemResponse>()
  const [openView, setOpenView] = React.useState<boolean>(false)

  const columns: ColumnDef<GetReservationsItemResponse>[] = [
    {
      accessorKey: 'id',
      id: 'id',
      header: () => {
        return (
          <div className="px-3.5 text-sm font-extrabold text-utility-gray-600">
            {t('columns.id')}
          </div>
        )
      },
    },
    {
      accessorKey: 'reservation_id',
      id: 'reservation_id',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.reservation_id')}
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
      accessorKey: 'date',
      id: 'date',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.date')}
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
      accessorKey: 'attendance',
      id: 'attendance',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.attendance')}
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
      accessorKey: 'client_name',
      id: 'client_name',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.client_name')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <Link href={`/client?id=${row.original.client_id}`}>
            <span className="text-sm font-medium text-utility-gray-900">
              {row.getValue('client_name')}
            </span>
          </Link>
        )
      },
    },
    {
      accessorKey: 'host_name',
      id: 'host_name',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.host_name')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <Link href={`/host?id=${row.original.host_id}`}>
            <span className="text-sm font-medium text-utility-gray-900">
              {row.getValue('host_name')}
            </span>
          </Link>
        )
      },
    },
    {
      accessorKey: 'space_name',
      id: 'space_name',
      header: ({ column }: any) => {
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
    {
      accessorKey: 'amount',
      id: 'amount',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.amount')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
      cell: ({ row }) => {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        }).format(
          row.getValue('amount')
            ? parseFloat(row.getValue('amount')) / 100
            : '0'
        )
      },
    },
    {
      accessorKey: 'refunded_amount',
      id: 'refunded_amount',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.refunded_amount')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
      cell: ({ row }) => {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        }).format(
          row.getValue('refunded_amount')
            ? parseFloat(row.getValue('refunded_amount')) / 100
            : '0'
        )
      },
    },
    {
      accessorKey: 'platform_fee_amount',
      id: 'platform_fee_amount',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.platform_fee_amount')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
      cell: ({ row }) => {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        }).format(
          row.getValue('platform_fee_amount')
            ? parseFloat(row.getValue('platform_fee_amount')) / 100
            : '0'
        )
      },
    },
    {
      accessorKey: 'created_at',
      id: 'created_at',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.created_at')}
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
      accessorKey: 'actions',
      header: () => {
        return <></>
      },
      cell: ({ row, table }) => {
        const handleClick = (action: string) => {
          if (table.options.meta?.viewData && action === 'view') {
            table.options.meta.viewData(row.original)
          }
        }

        return (
          <div className="inline-flex gap-x-[4px] items-center justify-end w-[100%]">
            <Button
              className="px-3"
              onClick={() => handleClick('view')}
              color="secondary"
              size="xs"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
  ]

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    attendance: false,
    refunded_amount: false,
    platform_fee_amount: false,
  })

  const [search, setSearch] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    manualSorting: false,
    globalFilterFn: 'includesString',
    state: {
      columnFilters: columnFilters,
      globalFilter: search,
      columnVisibility,
    },
    meta: {
      viewData: (values: GetReservationsItemResponse) => {
        setSelected(values)
        setOpenView(true)
      },
    },
  })

  return (
    <main>
      <DataTable.HeaderContainer>
        <div className="flex items-end h-16 max-sm:hidden">
          <DataTable.Title
            rowCount={table.getRowCount()}
            data-testid="title"
            className="pl-4 font-normal text-sm"
          >
            {t('table.results')}
          </DataTable.Title>
        </div>
        <DataTable.HeaderActionsContainer className="pl-4">
          <div className="w-full flex items-center gap-3">
            <div className="w-[320px] max-sm:w-full">
              <TextInput
                startAdornment={
                  <Search className="h-4 w-4 text-utility-gray-600" />
                }
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('table.search')}
                data-testid="search-input"
              />
            </div>
            <DataTable.ColumnVisibilityDropdown table={table} />
          </div>
        </DataTable.HeaderActionsContainer>
      </DataTable.HeaderContainer>
      <DataTable.Table table={table} columns={columns} isLoading={isPending} />
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="sm:max-w-[700px] max-sm:max-w-100svw">
          <DialogHeader>
            <DialogTitle>{t('titles.view-reservation')}</DialogTitle>
            <DialogDescription className="pt-4 pb-2">
              <div className="w-full flex gap-4 max-sm:flex-col">
                <div className="w-full flex flex-col gap-2 bg-utility-gray-100 px-6 py-6 rounded-xl">
                  {selected?.line_items
                    ? JSON.parse(selected.line_items)?.items?.map(
                        (item: { description: string; amount: string }) => {
                          return (
                            <div className="w-full grid grid-cols-3 items-center">
                              <p className="col-span-2">{item.description} </p>
                              <p className="text-utility-gray-800 bg-white px-2 py-1 rounded-sm col-span-1">
                                {Intl.NumberFormat('fr-FR', {
                                  style: 'currency',
                                  currency: 'EUR',
                                }).format(
                                  item.amount ? parseFloat(item.amount) : '0'
                                )}
                              </p>
                            </div>
                          )
                        }
                      )
                    : null}
                </div>
                <div className="w-full flex flex-col gap-2 max-sm:pl-6 py-6">
                  <div className="w-full flex gap-2">
                    <p>{t('sections.reservation.id')}</p>
                    <Link
                      href={`https://dashboard.stripe.com/payments/${selected?.payment_id}`}
                      target="_blank"
                      className="text-utility-gray-800"
                    >
                      <p className="text-utility-gray-800 font-semibold flex gap-2 items-center">
                        {selected?.payment_id}{' '}
                        <NavigationLink className="h-4 w-4" />
                      </p>
                    </Link>
                  </div>
                  <div className="w-full flex gap-2">
                    <p>{t('sections.reservation.amount')}</p>
                    <p className="text-utility-gray-800">
                      {Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(
                        selected?.amount
                          ? parseFloat(selected?.amount) / 100
                          : '0'
                      )}
                    </p>
                  </div>
                  <div className="w-full flex gap-2">
                    <p>{t('sections.reservation.platform_stripe_fee')}</p>
                    <p className="text-utility-gray-800">
                      {Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(
                        selected?.platform_stripe_fee
                          ? parseFloat(selected?.platform_stripe_fee) / 100
                          : '0'
                      )}
                    </p>
                  </div>
                  <div className="w-full flex gap-2">
                    <p>{t('sections.reservation.platform_fee')}</p>
                    <p className="text-utility-gray-800">
                      {Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(
                        selected?.platform_fee_amount
                          ? parseFloat(selected?.platform_fee_amount) / 100
                          : '0'
                      )}
                    </p>
                  </div>
                  <div className="w-full flex gap-2">
                    <p>{t('sections.reservation.host_total')}</p>
                    <p className="text-utility-gray-800">
                      {Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(
                        selected?.net ? parseFloat(selected?.net) / 100 : '0'
                      )}
                    </p>
                  </div>
                  <div className="w-full flex gap-2">
                    <p>{t('sections.reservation.refund_amount')}</p>
                    <p className="text-utility-gray-800">
                      {Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(
                        selected?.refunded_amount
                          ? parseFloat(selected?.refunded_amount) / 100
                          : '0'
                      )}
                    </p>
                  </div>
                  <div className="w-full flex gap-2">
                    <p>{t('sections.reservation.payment_date')}</p>
                    <p className="text-utility-gray-800">
                      {selected?.payment_date}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <p>{t('sections.reservation.status')}</p>
                    <Badge
                      color={
                        selected?.status ===
                          ReservationStatus.CancelledByClient ||
                        selected?.status === ReservationStatus.CancelledByHost
                          ? 'error'
                          : selected?.status === ReservationStatus.Confirmed
                          ? 'success'
                          : selected?.status === ReservationStatus.Pending
                          ? 'warning'
                          : 'white'
                      }
                    >
                      {t(`reservations-status.${selected?.status}`)}
                    </Badge>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  )
}
