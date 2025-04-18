'use client'

import { TextInput } from '@/components/inputs/text-input/text-input'
import { AvailabilityVerificationsListFilterMenu } from '@/components/menus/AvailabilityVerificationsListFilterMenu'
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
import { cn } from '@/lib/utils'
import { BlockMessageReason } from '@/lib/utils/consts'
import { approveMessage, blockMessage } from '@/services/api/messages'
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
  Filter,
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
  const [openFilters, setOpenFilters] = useState<boolean>(false)

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
        accessorKey: 'client_name',
        id: 'client_name',
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
                {row.original.client_name}
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
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
                {row.original.host_name}
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
                row.getValue('status') === 'reserved'
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
        accessorKey: 'space_visit_status',
        id: 'space_visit_status',
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
              {row.original.space_visit_status && (
                <Badge
                  color={
                    row.original.space_visit_status === 'canceled'
                      ? 'error'
                      : row.original.space_visit_status === 'reservation'
                      ? 'success'
                      : 'white'
                  }
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-sm font-light text-utility-gray-900">
                      {row.original.space_visit_date}
                    </span>
                    {t(
                      `space-visits-status.${row.original.space_visit_status}`
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
    host_name: false,
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

  const handleFilters = (filters: ColumnFiltersState) => {
    setColumnFilters(filters)
    setOpenFilters(false)
  }

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

  const approveMessageMutation = useMutation({
    mutationFn: approveMessage,
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
            <Button
              color="secondary"
              startAdornment={<Filter className="h-4 w-4" />}
              data-testid="filters-button"
              onClick={() => setOpenFilters(true)}
              disabled={!data || data.length === 0}
            >
              <span className="max-sm:hidden">{t('table.filters')}</span>
            </Button>
            <DataTable.ColumnVisibilityDropdown table={table} />
          </div>
        </DataTable.HeaderActionsContainer>
      </DataTable.HeaderContainer>
      <DataTable.Table table={table} columns={columns} isLoading={isPending} />
      {data && data.length > 0 && (
        <AvailabilityVerificationsListFilterMenu
          open={openFilters}
          onOpenChange={setOpenFilters}
          submit={handleFilters}
          data={data || []}
        />
      )}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="sm:max-w-[700px] max-sm:max-w-100svw">
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
                                <div className="flex gap-4 items-center max-sm:flex-col">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: msg.message,
                                    }}
                                    className="text-utility-error-700 text-wraps"
                                  ></div>
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
                                    {t('button-actions.block')}
                                  </Button>
                                  <Button
                                    variant="link"
                                    size="xs"
                                    onClick={() => {
                                      approveMessageMutation.mutate({
                                        id: msg.id,
                                      })
                                    }}
                                  >
                                    {t('button-actions.approve')}
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: msg.message,
                                  }}
                                  className={cn(
                                    'text-utility-gray-700',
                                    msg.status === 'blocked' &&
                                      'text-utility-error-700'
                                  )}
                                ></div>
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
