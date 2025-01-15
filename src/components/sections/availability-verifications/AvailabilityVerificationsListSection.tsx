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
import { toast } from '@/lib/hooks/use-toast'
import { BlockMessageReason } from '@/lib/utils/consts'
import { blockMessage } from '@/services/api/messages'
import { GetAllAvailabiltyVerificationsWithChatItemResponse } from '@/services/api/reservations'
import { useMutation } from '@tanstack/react-query'
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
  MessageCircle,
  MessageCircleWarning,
  Search,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useState } from 'react'

interface AvailabilityVerificationsListSectionProps {
  data: GetAllAvailabiltyVerificationsWithChatItemResponse[] | undefined
  isPending: boolean
  refresh: () => void
}

export default function AvailabilityVerificationsListSection({
  data,
  isPending,
  refresh,
}: AvailabilityVerificationsListSectionProps) {
  const t = useTranslations()
  const [selected, setSelected] =
    React.useState<GetAllAvailabiltyVerificationsWithChatItemResponse>()
  const [openView, setOpenView] = React.useState<boolean>(false)

  const columns: ColumnDef<GetAllAvailabiltyVerificationsWithChatItemResponse>[] =
    [
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
        accessorKey: 'date',
        id: 'date',
        header: ({ column }: any) => {
          return (
            <Button
              variant="link"
              color="secondary"
              className="text-utility-gray-600"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
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
        accessorKey: 'name',
        id: 'name',
        header: ({ column }: any) => {
          return (
            <Button
              variant="link"
              color="secondary"
              className="text-utility-gray-600"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('columns.name')}
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
            <Link href={`/client?id=${row.original.user.id}`}>
              <span className="text-sm font-medium text-utility-gray-900">
                {row.original.user.name}
              </span>
            </Link>
          )
        },
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: ({ column }: any) => {
          return (
            <Button
              variant="link"
              color="secondary"
              className="text-utility-gray-600"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('columns.status')}
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
            <Badge
              color={
                row.getValue('status') === 'not-available'
                  ? 'error'
                  : row.getValue('status') === 'available'
                  ? 'success'
                  : 'white'
              }
            >
              {t(`availability-verification-status.${row.getValue('status')}`)}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'space_visit',
        id: 'space_visit',
        header: ({ column }: any) => {
          return (
            <Button
              variant="link"
              color="secondary"
              className="text-utility-gray-600"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {t('columns.space_visit')}
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
            <>
              {row.original.space_visit?.date && (
                <Badge
                  color={
                    row.original.space_visit?.status === 'canceled'
                      ? 'error'
                      : row.original.space_visit?.status === 'reservation'
                      ? 'success'
                      : 'white'
                  }
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-sm font-light text-utility-gray-900">
                      {row.original.space_visit?.date}
                    </span>
                    {t(
                      `space-visits-status.${row.original.space_visit?.status}`
                    )}
                  </div>
                </Badge>
              )}
            </>
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
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
              {row.original.chat.pending > 0 ? (
                <Button
                  className="px-3"
                  onClick={() => handleClick('view')}
                  color="destructive"
                  variant="outline"
                  size="xs"
                >
                  <MessageCircleWarning className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  className="px-3"
                  onClick={() => handleClick('view')}
                  color="secondary"
                  size="xs"
                  disabled={row.original.chat.count === 0}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              )}
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
      viewData: (
        values: GetAllAvailabiltyVerificationsWithChatItemResponse
      ) => {
        values.chat.messages = values.chat.messages?.filter(
          (item) => item.message !== '#verify-availability'
        )
        setSelected(values)
        setOpenView(true)
      },
    },
  })

  const blockMessageMutation = useMutation({
    mutationFn: blockMessage,
    onSuccess: () => {
      toast({
        variant: 'success',
        title: t('success'),
        description: t('success-messages.submit'),
      })
      setOpenView(false)
      refresh()
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('error-messages.submit'),
      })
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
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{t('titles.view-conversation')}</DialogTitle>
            <DialogDescription className="pt-4 pb-2">
              <div className="w-full">
                {selected?.chat?.id && (
                  <div className="w-full text-left">
                    <div className="w-full flex flex-col max-h-[calc(100svh-100px)] overflow-auto">
                      {selected.chat.messages.length > 0 ? (
                        selected.chat.messages.map((msg, index) => {
                          return (
                            <div className="w-full mt-4" key={index}>
                              <p className="font-bold text-utility-gray-700">
                                {msg.from.name}
                              </p>
                              {msg.status === 'pending' ? (
                                <div className="flex gap-4 items-center">
                                  <p className="text-utility-error-700">
                                    {msg.message}
                                  </p>
                                  <Button
                                    variant="link"
                                    color="destructive"
                                    size="xs"
                                    onClick={() => {
                                      blockMessageMutation.mutate({
                                        id: msg.id,
                                        reason:
                                          BlockMessageReason.SharingContacts,
                                      })
                                    }}
                                  >
                                    Bloquear
                                  </Button>
                                </div>
                              ) : (
                                <p className="text-utility-gray-700">
                                  {msg.message}
                                </p>
                              )}

                              <p className="text-xs mt-1">{msg.created_at}</p>
                            </div>
                          )
                        })
                      ) : (
                        <div className="w-full mt-6">
                          <span className="font-semibold text-utility-gray-700">
                            {t('subtitles.empty-messages')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  )
}
