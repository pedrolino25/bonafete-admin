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
  deleteLocality,
  GetLocalitiesItemResponse,
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

interface LocalitiesListSectionProps {
  data: GetLocalitiesItemResponse[] | undefined
  isPending: boolean
  refresh: () => void
}

export default function LocalitiesListSection({
  data,
  isPending,
  refresh,
}: LocalitiesListSectionProps) {
  const t = useTranslations()
  const router = useRouter()
  const { toast } = useToast()

  const columns: ColumnDef<GetLocalitiesItemResponse>[] = [
    {
      accessorKey: 'id',
      id: 'id',
      header: () => {
        return (
          <div className="px-3.5 text-sm font-extrabold text-utility-gray-900">
            {t('columns.id')}
          </div>
        )
      },
    },
    {
      accessorKey: 'title',
      id: 'title',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.title')}
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
      accessorKey: 'latitude',
      id: 'latitude',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.latitude')}
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
      accessorKey: 'longitude',
      id: 'longitude',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.longitude')}
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
      accessorKey: 'radius',
      id: 'radius',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.radius')}
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
      accessorKey: 'url',
      id: 'url',
      header: ({ column }: any) => {
        return (
          <Button
            variant="link"
            color="secondary"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.url')}
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

  const [selected, setSelected] = useState<GetLocalitiesItemResponse>()
  const [openRemove, setOpenRemove] = useState<boolean>(false)

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

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
      editData: (values: GetLocalitiesItemResponse) =>
        router.push(`/reference-data/localities/edit?id=${values.id}`),
      deleteData: (values: GetLocalitiesItemResponse) => {
        setSelected(values)
        setOpenRemove(true)
      },
    },
  })

  const deleteLocalityMutation = useMutation({
    mutationFn: deleteLocality,
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
              onClick={() => router.push('/reference-data/localities/create')}
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
                deleteLocalityMutation.mutate({
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
