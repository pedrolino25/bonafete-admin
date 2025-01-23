'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { SelectInput } from '@/components/inputs/select-input/select-input'
import { TextInput } from '@/components/inputs/text-input/text-input'
import { Option } from '@/components/ui/select'
import { toast } from '@/lib/hooks/use-toast'
import { CuponType } from '@/lib/utils/consts'
import { createUpdateCupon } from '@/services/api/cupons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const optionSchema = z.object({
  value: z.string().min(1, 'Value is required'),
  label: z.string().min(1, 'Label is required'),
  info: z.string().optional(),
  node: z.any().optional(),
  disabled: z.any().optional(),
})

const localityFormSchema = z.object({
  id: z.string().optional(),
  type: z.array(optionSchema).min(1),
  code: z.string().min(1),
  percentage: z.string().min(1),
  fixed: z.string().min(1),
  minReservationValue: z.string().min(1),
  expirationHours: z.string().min(1),
  status: z.array(optionSchema).min(1),
})

export type CuponFormType = z.infer<typeof localityFormSchema>

interface CreateEditCuponSectionProps {
  defaultValues?: CuponFormType
}

export default function CreateEditCuponSection({
  defaultValues,
}: CreateEditCuponSectionProps) {
  const t = useTranslations()
  const router = useRouter()

  const typeOptions = [
    { value: CuponType.SIGN_UP, label: t('sections.cupons.sign-up') },
    {
      value: CuponType.REFERAL_SHARE,
      label: t('sections.cupons.referal-share'),
    },
    {
      value: CuponType.REFERAL_RESERVATION,
      label: t('sections.cupons.referal-reservation'),
    },
    { value: CuponType.RESERVATION, label: t('sections.cupons.reservation') },
    { value: CuponType.REVIEW, label: t('sections.cupons.review') },
    {
      value: CuponType.FAST_RESERVATION,
      label: t('sections.cupons.fast-reservation'),
    },
    {
      value: CuponType.FAST_RESERVATION_FW,
      label: t('sections.cupons.fast-reservation-fw'),
    },
    { value: CuponType.ANNIVERSARY, label: t('sections.cupons.aniversary') },
    { value: CuponType.APPLICATION, label: t('sections.cupons.application') },
    { value: CuponType.INFLUENCER, label: t('sections.cupons.influencer') },
  ]

  const statusOptions = [
    { value: 'active', label: t('sections.cupons.active') },
    {
      value: 'inactive',
      label: t('sections.cupons.inactive'),
    },
  ]

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<CuponFormType>({
    mode: 'onChange',
    resolver: zodResolver(localityFormSchema),
    defaultValues: {
      ...defaultValues,
      type: defaultValues
        ? typeOptions?.filter(
            (item) => item.value === (defaultValues.type as unknown as string)
          )
        : [],
      status: defaultValues
        ? typeOptions?.filter(
            (item) => item.value === (defaultValues.status as unknown as string)
          )
        : [],
    },
  })

  const onSubmit = (values: CuponFormType) => {
    createUpdateCuponMutation.mutate({
      id: values.id,
      type: values.type?.[0]?.value,
      code: values.code,
      percentage: parseInt(values.percentage),
      fixed: parseInt(values.fixed),
      minReservationValue: parseInt(values.minReservationValue),
      expirationHours: parseInt(values.expirationHours),
      status: values.status?.[0]?.value,
    })
  }

  const createUpdateCuponMutation = useMutation({
    mutationFn: createUpdateCupon,
    onSuccess: () => {
      toast({
        variant: 'success',
        title: t('success'),
        description: t('success-messages.submit'),
      })
      router.back()
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('error-messages.submit'),
      })
    },
  })

  const handleChange =
    (field: keyof CuponFormType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValue(field, value, { shouldValidate: true, shouldDirty: true })
    }
  const handleSelectChange =
    (field: keyof CuponFormType) => (option: Option[]) => {
      setValue(field, option, { shouldValidate: true, shouldDirty: true })
    }

  return (
    <form
      className="w-full max-sm:border-t max-sm:px-1 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full border-b pb-4 flex justify-between items-center max-sm:flex-col px-6 max-sm:px-1">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-utility-brand-600">
            {defaultValues
              ? t('sections.cupons.edit-title')
              : t('sections.cupons.create-title')}
          </h3>
          <p className="text-sm font-light text-utility-gray-500 pt-1 pr-4">
            {defaultValues
              ? t('sections.cupons.edit-subtitle')
              : t('sections.cupons.create-subtitle')}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 max-sm:justify-end max-sm:items-start max-sm:pt-4 max-sm:w-full">
          <Button
            type="submit"
            disabled={!isValid}
            startAdornment={<Send className="h-4 w-4" />}
          >
            {t('button-actions.submit')}
          </Button>
        </div>
      </div>
      <div className="w-9/12 max-w-[700px] max-sm:w-full gap-4 pt-8 pl-6 max-sm:pl-0 pb-12 grid grid-cols-2 max-sm:grid-cols-1">
        <SelectInput
          required
          data-testid="type"
          label={t('columns.type')}
          placeholder={t('columns.type')}
          options={typeOptions}
          value={getValues('type')}
          onSelect={handleSelectChange('type')}
        />
        <TextInput
          required
          label={t('columns.code')}
          placeholder={t('columns.code')}
          value={getValues().code}
          onChange={handleChange('code')}
        />
        <TextInput
          required
          label={t('columns.percentage')}
          placeholder={t('columns.percentage')}
          value={getValues().percentage}
          onChange={handleChange('percentage')}
          type="number"
        />
        <TextInput
          required
          label={t('columns.fixed')}
          placeholder={t('columns.fixed')}
          value={getValues().fixed}
          onChange={handleChange('fixed')}
          type="number"
        />
        <TextInput
          required
          label={t('columns.min-reservation-value')}
          placeholder={t('columns.min-reservation-value')}
          value={getValues().minReservationValue}
          onChange={handleChange('minReservationValue')}
          type="number"
        />
        <TextInput
          required
          label={t('columns.expiration-hours')}
          placeholder={t('columns.expiration-hours')}
          value={getValues().expirationHours}
          onChange={handleChange('expirationHours')}
          type="number"
        />
        <SelectInput
          required
          data-testid="status"
          label={t('columns.status')}
          placeholder={t('columns.status')}
          options={statusOptions}
          value={getValues('status')}
          onSelect={handleSelectChange('status')}
        />
      </div>
    </form>
  )
}
