import { Button } from '@/components/ui/button'
import { Option } from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { GetAllAvailabiltyVerificationsWithChatItemResponse } from '@/services/api/reservations'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnFiltersState } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { SelectInput } from '../inputs/select-input/select-input'

const optionSchema = z.object({
  value: z.string().min(1, 'Value is required'),
  label: z.string().min(1, 'Label is required'),
  info: z.string().optional(),
  node: z.any().optional(),
})

const availabilityVerificationsListFilterFormSchema = z.object({
  status: z.array(optionSchema).optional(),
  visit_status: z.array(optionSchema).optional(),
  host_name: z.array(optionSchema).optional(),
})

export type AvailabilityVerificationsListFilterFormType = z.infer<
  typeof availabilityVerificationsListFilterFormSchema
>

export interface AvailabilityVerificationsListFilterMenuProps {
  data: GetAllAvailabiltyVerificationsWithChatItemResponse[]
  open?: boolean
  onOpenChange: (val: boolean) => void
  submit: (filters: ColumnFiltersState) => void
}

export function AvailabilityVerificationsListFilterMenu({
  data,
  open,
  onOpenChange,
  submit,
}: AvailabilityVerificationsListFilterMenuProps) {
  const t = useTranslations()
  const getStatusOptions = (): Option[] => {
    const modelSet = new Set<string>()
    data.forEach((item) => {
      modelSet.add(item.status)
    })
    const options: Option[] = Array.from(modelSet).map((item) => ({
      value: item,
      label: t(`availability-verification-status.${item}`),
    }))
    return options
  }

  const getVisitStatusOptions = (): Option[] => {
    const modelSet = new Set<string>()
    data.forEach((item) => {
      if (item.space_visit_status) modelSet.add(item.space_visit_status)
    })
    const options: Option[] = Array.from(modelSet).map((item) => ({
      value: item,
      label: t(`space-visits-status.${item}`),
    }))
    return options
  }

  const getHostOptions = (): Option[] => {
    const modelSet = new Set<string>()
    data.forEach((item) => {
      if (item.host_name) modelSet.add(item.host_name)
    })
    const options: Option[] = Array.from(modelSet).map((item) => ({
      value: item,
      label: item,
    }))
    return options
  }

  const [statusOptions] = useState<Option[]>(getStatusOptions())
  const [visitStatusOptions] = useState<Option[]>(getVisitStatusOptions())
  const [hostOptions] = useState<Option[]>(getHostOptions())

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isDirty },
  } = useForm<AvailabilityVerificationsListFilterFormType>({
    mode: 'onChange',
    resolver: zodResolver(availabilityVerificationsListFilterFormSchema),
  })

  const handleSelectChange =
    (field: keyof AvailabilityVerificationsListFilterFormType) =>
    (option: Option[]) => {
      setValue(field, option, { shouldValidate: true, shouldDirty: true })
    }

  const onSubmit = (values: AvailabilityVerificationsListFilterFormType) => {
    const filter = []
    if (values.status && values.status[0]) {
      filter.push({
        id: 'status',
        value: values.status[0].value,
      })
    }

    if (values.visit_status && values.visit_status[0]) {
      filter.push({
        id: 'space_visit_status',
        value: values.visit_status[0].value,
      })
    }
    submit(filter)
  }

  const onClear = () => {
    setValue('status', [], {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('visit_status', [], { shouldDirty: true })
    submit([])
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('table.filters')}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col pt-6 justify-between h-full">
          <div className="flex flex-col gap-4">
            <SelectInput
              data-testid="status"
              label={t('columns.status')}
              placeholder={t('table.select-from-list')}
              options={statusOptions}
              value={getValues().status}
              onSelect={handleSelectChange('status')}
            />
            <SelectInput
              data-testid="visit_status"
              label={t('columns.space_visit')}
              placeholder={t('table.select-from-list')}
              options={visitStatusOptions}
              value={getValues().visit_status}
              onSelect={handleSelectChange('visit_status')}
            />
            <SelectInput
              data-testid="visit_status"
              label={t('columns.host_name')}
              placeholder={t('table.select-from-list')}
              options={hostOptions}
              value={getValues().host_name}
              onSelect={handleSelectChange('host_name')}
            />
          </div>
          <div className="flex gap-4 py-6">
            <Button
              color="secondary"
              className="w-full"
              onClick={onClear}
              disabled={!isDirty}
            >
              {t('table.clear')}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              className="w-full"
              disabled={!isDirty}
            >
              {t('table.apply')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
