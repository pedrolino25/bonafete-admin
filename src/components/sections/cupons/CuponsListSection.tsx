'use client'

import { TextInput } from '@/components/inputs/text-input/text-input'
import { DataTable } from '@/components/table/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CUPON_TYPES_OPTIONS } from '@/lib/utils/consts'
import { CuponsListItemResponse } from '@/services/api/cupons'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, Plus, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CuponsListSectionProps {
  data: CuponsListItemResponse[] | undefined
  isPending: boolean
  refresh: () => void
}

export default function CuponsListSection({
  data,
  isPending,
  refresh,
}: CuponsListSectionProps) {
  const t = useTranslations()
  const router = useRouter()

  const columns: ColumnDef<CuponsListItemResponse>[] = [
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
      accessorKey: 'type',
      id: 'type',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.type')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
      cell: ({ row }) => {
        return t(
          CUPON_TYPES_OPTIONS?.find(
            (item) => item.value === (row.getValue('type') as unknown as string)
          )?.label
        )
      },
    },
    {
      accessorKey: 'code',
      id: 'code',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.code')}
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
      accessorKey: 'value',
      id: 'value',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.value')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
      cell: ({ row }) => {
        return row.original.is_percentage
          ? `${row.getValue('value')}%`
          : new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }).format(row.getValue('value') ? row.getValue('value') : '0')
      },
    },
    {
      accessorKey: 'min_reservation',
      id: 'min_reservation',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.min_reservation')}
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
          row.getValue('min_reservation')
            ? row.getValue('min_reservation')
            : '0'
        )
      },
    },
    {
      accessorKey: 'expire_at',
      id: 'expire_at',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.expire_at')}
            {column.getIsSorted() === 'desc' ? (
              <ChevronUp className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronDown className="ml-2 h-3 w-3" />
            ) : null}
          </Button>
        )
      },
      cell: ({ row }) => {
        return `${row.getValue('expire_at')} dias`
      },
    },
    {
      accessorKey: 'status',
      id: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
            shape="square"
            color={row.getValue('status') === 'active' ? 'success' : 'gray'}
          >
            {t(`cupons-status.${row.getValue('status')}`)}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'actions',
      header: () => {
        return <></>
      },
      cell: ({ row, table }: any) => {
        const handleClick = (action: string) => {
          if (table.options.meta?.editData && action === 'edit') {
            table.options.meta.editData(row.original)
          }
        }

        return (
          <div className="inline-flex gap-x-[4px] items-center justify-end w-[100%]">
            <DataTable.ActionsDropdown
              actions={['edit']}
              onClick={handleClick}
            />
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
  ]

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    business_type: false,
    account_id: false,
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
      editData: (values: CuponsListItemResponse) =>
        router.push(`/cupons/management/edit?id=${values.id}`),
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
              endAdornment={<Plus className="h-4 w-4" />}
              data-testid="create-button"
              onClick={() => router.push('/cupons/management/create')}
            >
              {t('table.create')}
            </Button>
            <DataTable.ColumnVisibilityDropdown table={table} />
          </div>
        </DataTable.HeaderActionsContainer>
      </DataTable.HeaderContainer>
      <DataTable.Table table={table} columns={columns} isLoading={isPending} />
    </main>
  )
}
