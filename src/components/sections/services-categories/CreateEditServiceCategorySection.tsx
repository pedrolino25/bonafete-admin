'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { TextInput } from '@/components/inputs/text-input/text-input'
import { toast } from '@/lib/hooks/use-toast'
import { createUpdateServicesCategory } from '@/services/api/reference-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const serviceCategoryFormSchema = z.object({
  id: z.string().optional(),
  key: z.string().min(1),
  value: z.string().min(1),
})

export type ServiceCategoryFormType = z.infer<typeof serviceCategoryFormSchema>

interface CreateEditServiceCategorySectionProps {
  defaultValues?: ServiceCategoryFormType
}

export default function CreateEditServiceCategorySection({
  defaultValues,
}: CreateEditServiceCategorySectionProps) {
  const t = useTranslations()
  const router = useRouter()

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<ServiceCategoryFormType>({
    mode: 'onChange',
    resolver: zodResolver(serviceCategoryFormSchema),
    defaultValues,
  })

  const onSubmit = (values: ServiceCategoryFormType) => {
    createUpdateServiceCategoryMutation.mutate({
      id: values?.id,
      key: values.key,
      value: values.value,
    })
  }

  const createUpdateServiceCategoryMutation = useMutation({
    mutationFn: createUpdateServicesCategory,
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
    (field: keyof ServiceCategoryFormType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValue(field, value, { shouldValidate: true, shouldDirty: true })
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
              ? t('sections.services-category.edit-title')
              : t('sections.services-category.create-title')}
          </h3>
          <p className="text-sm font-light text-utility-gray-500 pt-1 pr-4">
            {defaultValues
              ? t('sections.services-category.edit-subtitle')
              : t('sections.services-category.create-subtitle')}
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
        <TextInput
          label={t('columns.id')}
          placeholder={t('columns.id')}
          value={getValues().id}
          onChange={handleChange('id')}
          disabled
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
