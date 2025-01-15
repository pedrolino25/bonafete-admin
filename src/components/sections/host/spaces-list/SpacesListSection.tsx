'use client'

import { DataTable } from '@/components/table/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from '@/lib/hooks/use-toast'
import { SpaceStatus } from '@/lib/utils/consts'
import { SpaceInfoResponse } from '@/services/api/hosts'
import { updateSpaceStatus } from '@/services/api/spaces'
import { useMutation } from '@tanstack/react-query'
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Ban, ChevronDown, ChevronUp, Send, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'

interface SpacesListSectionProps {
  data: SpaceInfoResponse[]
  refetch?: () => void
}

export default function SpacesListSection({
  data,
  refetch,
}: SpacesListSectionProps) {
  const t = useTranslations()
  const router = useRouter()
  const [selected, setSelected] = React.useState<SpaceInfoResponse>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [openArchive, setOpenArchive] = React.useState<boolean>(false)
  const [openPublish, setOpenPublish] = React.useState<boolean>(false)

  const columns: ColumnDef<SpaceInfoResponse>[] = [
    {
      accessorKey: 'title',
      id: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            color="secondary"
            className="text-utility-gray-600"
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
            color={
              row.getValue('status') === SpaceStatus.Archived
                ? 'error'
                : row.getValue('status') === SpaceStatus.Active
                ? 'success'
                : row.getValue('status') === SpaceStatus.Pending
                ? 'warning'
                : 'white'
            }
          >
            {t(`space-status.${row.getValue('status')}`)}
          </Badge>
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
          if (table.options.meta?.viewData && action === 'manage') {
            table.options.meta.viewData(row.original)
          } else if (table.options.meta?.archiveData && action === 'archive') {
            table.options.meta.archiveData(row.original)
          } else if (table.options.meta?.publishData && action === 'publish') {
            table.options.meta.publishData(row.original)
          }
        }

        return (
          <div className="inline-flex gap-x-[4px] items-center justify-end w-[100%]">
            {row.original.status === SpaceStatus.Active ? (
              <div className="flex gap-4 max-sm:flex-col">
                <Button
                  className="px-3"
                  endAdornment={<Settings className="w-4 h-4" />}
                  onClick={() => handleClick('manage')}
                  color="secondary"
                  size="xs"
                >
                  {t('button-actions.manage')}
                </Button>
                <Button
                  className="px-3"
                  endAdornment={<Ban className="w-4 h-4" />}
                  variant="outline"
                  onClick={() => handleClick('archive')}
                  color="destructive"
                  size="xs"
                >
                  {t(`button-actions.archive`)}
                </Button>
              </div>
            ) : row.original.status === SpaceStatus.Archived ? (
              <div className="flex gap-4 max-sm:flex-col">
                <Button
                  className="px-3"
                  endAdornment={<Settings className="w-4 h-4" />}
                  onClick={() => handleClick('manage')}
                  color="secondary"
                  size="xs"
                >
                  {t('button-actions.manage')}
                </Button>
                <Button
                  className="px-3"
                  size="xs"
                  endAdornment={<Send className="w-4 h-4" />}
                  onClick={() => handleClick('publish')}
                  color="success"
                >
                  {t(`button-actions.publish`)}
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 max-sm:flex-col">
                <Button
                  className="px-3"
                  endAdornment={<Settings className="w-4 h-4" />}
                  onClick={() => handleClick('manage')}
                  color="secondary"
                  size="xs"
                >
                  {t('button-actions.manage')}
                </Button>
              </div>
            )}
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
  ]

  const table = useReactTable({
    data: data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
    meta: {
      viewData: (values: SpaceInfoResponse) => {
        router.push(`/space?id=${values.id}`)
      },
      archiveData: (values: SpaceInfoResponse) => {
        setSelected(values)
        setOpenArchive(true)
      },
      publishData: (values: SpaceInfoResponse) => {
        setSelected(values)
        setOpenPublish(true)
      },
    },
  })

  const updateSpaceStatusMutation = useMutation({
    mutationFn: updateSpaceStatus,
    onSuccess: () => {
      refetch?.()
      setIsLoading(false)
      setOpenArchive(false)
      setOpenPublish(false)
    },
    onError: () => {
      setIsLoading(false)
      setOpenArchive(false)
      setOpenPublish(false)
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('error-messages.submit'),
      })
    },
  })

  return (
    <div className="w-full pl-6 max-sm:pl-2">
      <div className="w-full px-1 pb-6 border rounded-xl">
        <p className="text-lg font-bold pl-6 pb-4 pt-6 text-utility-brand-600">
          {t('titles.spaces')}
        </p>
        <DataTable.Table
          table={table}
          columns={columns}
          isLoading={false}
          className="max-h-[370px]"
        />
        <Dialog open={openArchive} onOpenChange={setOpenArchive}>
          <DialogContent className="sm:max-w-[425px] max-sm:max-w-100svw">
            <DialogHeader>
              <DialogTitle>{t('titles.archive-space')}</DialogTitle>
              <DialogDescription className="pt-2 pb-6">
                {t('subtitles.archive-space')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                color="secondary"
                disabled={isLoading}
                onClick={() => setOpenArchive(false)}
              >
                {t('button-actions.cancel')}
              </Button>
              <Button
                color="destructive"
                loading={isLoading}
                disabled={isLoading}
                onClick={() => {
                  updateSpaceStatusMutation.mutate({
                    id: selected?.id as string,
                    status: SpaceStatus.Archived,
                  })
                  setIsLoading(true)
                }}
              >
                {t('button-actions.confirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openPublish} onOpenChange={setOpenPublish}>
          <DialogContent className="sm:max-w-[425px] max-sm:max-w-100svw">
            <DialogHeader>
              <DialogTitle>{t('titles.publish-space')}</DialogTitle>
              <DialogDescription className="pt-2 pb-6">
                {t('subtitles.publish-space')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                color="secondary"
                disabled={isLoading}
                onClick={() => setOpenPublish(false)}
              >
                {t('button-actions.cancel')}
              </Button>
              <Button
                loading={isLoading}
                disabled={isLoading}
                onClick={() => {
                  updateSpaceStatusMutation.mutate({
                    id: selected?.id as string,
                    status: SpaceStatus.Active,
                  })
                  setIsLoading(true)
                }}
              >
                {t('button-actions.confirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
