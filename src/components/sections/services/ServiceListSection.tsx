'use client'

import { TextInput } from '@/components/inputs/text-input/text-input'
import { DataTable } from '@/components/table/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/lib/hooks/use-toast'
import {
  deleteService,
  ServicesListItemResponse,
} from '@/services/api/reference-data'
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
import { ChevronDown, ChevronUp, Plus, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ServiceListSectionProps {
  data: ServicesListItemResponse[] | undefined
  isPending: boolean
  refresh: () => void
}

export default function ServiceListSection({
  data,
  isPending,
  refresh,
}: ServiceListSectionProps) {
  const t = useTranslations()
  const router = useRouter()
  const { toast } = useToast()

  const columns: ColumnDef<ServicesListItemResponse>[] = [
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
      accessorKey: 'key',
      id: 'key',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.key')}
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
      header: ({ column }: any) => {
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
    },
    {
      accessorKey: 'category',
      id: 'category',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.category')}
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
      cell: ({ row, table }: any) => {
        const handleClick = (action: string) => {
          if (table.options.meta?.editData && action === 'edit') {
            table.options.meta.editData(row.original)
          }
          if (table.options.meta?.editData && action === 'remove') {
            table.options.meta.deleteData(row.original)
          }
        }

        return (
          <div className="inline-flex gap-x-[4px] items-center justify-end w-[100%]">
            <DataTable.ActionsDropdown
              actions={['edit', 'remove']}
              onClick={handleClick}
            />
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
  ]

  const [selected, setSelected] = useState<ServicesListItemResponse>()
  const [openRemove, setOpenRemove] = useState<boolean>(false)

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
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
      editData: (values: ServicesListItemResponse) =>
        router.push(`/reference-data/services/edit?id=${values.id}`),
      deleteData: (values: ServicesListItemResponse) => {
        setSelected(values)
        setOpenRemove(true)
      },
    },
  })

  const deleteServiceMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      toast({
        variant: 'success',
        title: t('success'),
        description: t('success-messages.delete'),
      })
      refresh?.()
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('error-messages.delete'),
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
              endAdornment={<Plus className="h-4 w-4" />}
              data-testid="create-button"
              onClick={() => router.push('/reference-data/services/create')}
            >
              {t('table.create')}
            </Button>
            <DataTable.ColumnVisibilityDropdown table={table} />
          </div>
        </DataTable.HeaderActionsContainer>
      </DataTable.HeaderContainer>
      <DataTable.Table table={table} columns={columns} isLoading={isPending} />
      <Dialog open={openRemove} onOpenChange={setOpenRemove}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('titles.remove')}</DialogTitle>
            <DialogDescription className="pt-2 pb-6">
              {t('subtitles.remove')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button color="secondary" onClick={() => setOpenRemove(false)}>
              {t('button-actions.cancel')}
            </Button>
            <Button
              color="destructive"
              onClick={() => {
                deleteServiceMutation.mutate({
                  id: selected?.id as string,
                })
                setOpenRemove(false)
              }}
            >
              {t('button-actions.remove')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
