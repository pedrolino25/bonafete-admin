import { Button } from '@/components/ui/button'
import { Option } from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { HOURS } from '@/lib/utils/consts'
import {
  LocalityListItemResponse,
  ServicesListItemResponse,
  SpaceTargetListItemResponse,
  SpaceTypeListItemResponse,
} from '@/services/api/reference-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnFiltersState } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { SelectInput } from '../inputs/select-input/select-input'
import { TextInput } from '../inputs/text-input/text-input'
import DatePicker from '../ui/date-picker'

const optionSchema = z.object({
  value: z.string().min(1, 'Value is required'),
  label: z.string().min(1, 'Label is required'),
  info: z.string().optional(),
  node: z.any().optional(),
})

const availableOffersListFilterMenuFilterFormSchema = z.object({
  locality: z.array(optionSchema).optional(),
  services: z.array(optionSchema).optional(),
  party_type: z.array(optionSchema).optional(),
  space_type: z.array(optionSchema).optional(),
  time_init: z.array(optionSchema).optional(),
  time_end: z.array(optionSchema).optional(),
  nr_persons: z.string().optional(),
  date: z.date().optional(),
})

export type AvailableOffersListFilterMenuFilterFormType = z.infer<
  typeof availableOffersListFilterMenuFilterFormSchema
>

export interface AvailableOffersListFilterMenuFilterMenuProps {
  localitiesList: LocalityListItemResponse[]
  servicesList: ServicesListItemResponse[]
  partyTypesList: SpaceTargetListItemResponse[]
  spaceTypesList: SpaceTypeListItemResponse[]
  open?: boolean
  onOpenChange: (val: boolean) => void
  submit: (filters: ColumnFiltersState) => void
  defaultValues?: AvailableOffersListFilterMenuFilterFormType
}

export function AvailableOffersListFilterMenuFilterMenu({
  localitiesList,
  servicesList,
  partyTypesList,
  spaceTypesList,
  open,
  onOpenChange,
  submit,
  defaultValues,
}: AvailableOffersListFilterMenuFilterMenuProps) {
  const t = useTranslations()

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isDirty },
  } = useForm<AvailableOffersListFilterMenuFilterFormType>({
    mode: 'onChange',
    resolver: zodResolver(availableOffersListFilterMenuFilterFormSchema),
    defaultValues,
  })

  const handleSelectChange =
    (field: keyof AvailableOffersListFilterMenuFilterFormType) =>
    (option: Option[]) => {
      setValue(field, option, { shouldValidate: true, shouldDirty: true })
    }

  const onSubmit = (values: AvailableOffersListFilterMenuFilterFormType) => {
    /*
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

    if (values.host_name && values.host_name[0]) {
      filter.push({
        id: 'host_name',
        value: values.host_name[0].value,
      })
    }

    submit(filter)
    */
  }

  const onClear = () => {
    /*
    setValue('status', [], {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('visit_status', [], { shouldDirty: true })
    setValue('host_name', [], { shouldDirty: true })
    
    submit([])
    */
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('table.filters')}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col pt-6 justify-between h-full">
          <div className="flex flex-col gap-4 max-h-[calc(100svh-100px)] overflow-y-auto">
            <SelectInput
              data-testid="party_type"
              label={t('columns.party_type')}
              placeholder={t('table.select-from-list')}
              options={partyTypesList?.map((item) => {
                return {
                  value: item.id,
                  label: item.label,
                }
              })}
              value={getValues().party_type}
              onSelect={handleSelectChange('party_type')}
            />
            <SelectInput
              data-testid="locality"
              label={t('columns.locality')}
              placeholder={t('table.select-from-list')}
              options={localitiesList?.map((item) => {
                return {
                  value: item.id,
                  label: item.title,
                }
              })}
              value={getValues().locality}
              onSelect={handleSelectChange('locality')}
            />
            <DatePicker
              label={t('columns.date')}
              defaultValue={getValues().date}
              onChange={(value) =>
                setValue('date', value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
            <SelectInput
              data-testid="time_init"
              label={t('columns.time_init')}
              placeholder={t('table.select-from-list')}
              options={HOURS}
              value={getValues().time_init}
              onSelect={handleSelectChange('time_init')}
            />
            <SelectInput
              data-testid="time_end"
              label={t('columns.time_end')}
              placeholder={t('table.select-from-list')}
              options={HOURS}
              value={getValues().time_end}
              onSelect={handleSelectChange('time_end')}
            />
            <TextInput
              label={t('columns.number_of_persons')}
              placeholder={t('columns.number_of_persons')}
              value={getValues().nr_persons}
              onChange={(e) =>
                setValue('nr_persons', e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              type="number"
            />
            <SelectInput
              data-testid="services"
              label={t('columns.services')}
              placeholder={t('table.select-from-list')}
              multiple
              options={servicesList?.map((item) => {
                return {
                  value: item.id,
                  label: item.value,
                  info: item.serviceCategory.value,
                }
              })}
              value={getValues().services}
              onSelect={handleSelectChange('services')}
            />
            <SelectInput
              data-testid="space_type"
              label={t('columns.space_type')}
              placeholder={t('table.select-from-list')}
              options={spaceTypesList?.map((item) => {
                return {
                  value: item.id,
                  label: item.label,
                }
              })}
              value={getValues().space_type}
              onSelect={handleSelectChange('space_type')}
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
