'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { SelectInput } from '@/components/inputs/select-input/select-input'
import { TextInput } from '@/components/inputs/text-input/text-input'
import { Option } from '@/components/ui/select'
import { toast } from '@/lib/hooks/use-toast'
import {
  createUpdateService,
  getServicesCategoriesList,
} from '@/services/api/reference-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
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

const serviceFormSchema = z.object({
  id: z.string().optional(),
  key: z.string().min(1),
  value: z.string().min(1),
  category: z.array(optionSchema).min(1),
})

export type ServiceFormType = z.infer<typeof serviceFormSchema>

interface CreateEditServiceSectionProps {
  defaultValues?: ServiceFormType
}

export default function CreateEditServiceSection({
  defaultValues,
}: CreateEditServiceSectionProps) {
  const t = useTranslations()
  const router = useRouter()

  const { data: servicesCategories } = useQuery({
    queryKey: ['services-categories'],
    queryFn: async () => {
      return await getServicesCategoriesList()
    },
  })

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<ServiceFormType>({
    mode: 'onChange',
    resolver: zodResolver(serviceFormSchema),
    defaultValues,
  })

  const onSubmit = (values: ServiceFormType) => {
    createUpdateServiceMutation.mutate({
      id: values?.id,
      key: values.key,
      value: values.value,
      serviceCategory: { id: values.category[0]?.value },
    })
  }

  const createUpdateServiceMutation = useMutation({
    mutationFn: createUpdateService,
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
    (field: keyof ServiceFormType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValue(field, value, { shouldValidate: true, shouldDirty: true })
    }

  const handleSelectChange =
    (field: keyof ServiceFormType) => (option: Option[]) => {
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
              ? t('sections.services.edit-title')
              : t('sections.services.create-title')}
          </h3>
          <p className="text-sm font-light text-utility-gray-500 pt-1 pr-4">
            {defaultValues
              ? t('sections.services.edit-subtitle')
              : t('sections.services.create-subtitle')}
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
      <div className="w-9/12 max-w-[700px] max-sm:w-full gap-4 pt-8 pl-6 max-sm:pl-0 pb-12 grid grid-cols-1">
        <SelectInput
          required
          data-testid="category"
          label={t('columns.category')}
          placeholder={t('columns.category')}
          options={
            servicesCategories?.map((item) => {
              return {
                value: item.id,
                label: item.value,
              }
            }) || []
          }
          value={getValues().category}
          onSelect={handleSelectChange('category')}
        />
        <TextInput
          required
          label={t('columns.key')}
          placeholder={t('columns.key')}
          value={getValues().key}
          onChange={handleChange('key')}
        />
        <TextInput
          required
          label={t('columns.value')}
          placeholder={t('columns.value')}
          value={getValues().value}
          onChange={handleChange('value')}
        />
      </div>
    </form>
  )
}
