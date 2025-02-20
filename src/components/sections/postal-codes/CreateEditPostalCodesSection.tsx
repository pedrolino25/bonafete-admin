'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { TextInput } from '@/components/inputs/text-input/text-input'
import { toast } from '@/lib/hooks/use-toast'
import { createUpdatePostalCode } from '@/services/api/reference-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const postalCodeFormSchema = z.object({
  id: z.string().min(1),
  city: z.string().min(1),
  locality: z.string().min(1),
  postal_code: z.string().min(1),
  latitude: z.string().min(1),
  longitude: z.string().min(1),
})

export type PostalCodeFormType = z.infer<typeof postalCodeFormSchema>

interface CreateEditPostalCodeSectionProps {
  defaultValues?: PostalCodeFormType
}

export default function CreateEditPostalCodeSection({
  defaultValues,
}: CreateEditPostalCodeSectionProps) {
  const t = useTranslations()
  const router = useRouter()

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<PostalCodeFormType>({
    mode: 'onChange',
    resolver: zodResolver(postalCodeFormSchema),
    defaultValues,
  })

  const onSubmit = (values: PostalCodeFormType) => {
    createUpdatePostalCodeMutation.mutate({
      id: values.id,
      city: values.city,
      locality: values.locality,
      postalCode: values.postal_code,
      latitude: parseFloat(values.latitude),
      longitude: parseFloat(values.longitude),
    })
  }

  const createUpdatePostalCodeMutation = useMutation({
    mutationFn: createUpdatePostalCode,
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
    (field: keyof PostalCodeFormType) =>
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
              ? t('sections.postal-codes.edit-title')
              : t('sections.postal-codes.create-title')}
          </h3>
          <p className="text-sm font-light text-utility-gray-500 pt-1 pr-4">
            {defaultValues
              ? t('sections.postal-codes.edit-subtitle')
              : t('sections.postal-codes.create-subtitle')}
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
          required
          label={t('columns.id')}
          placeholder={t('columns.id')}
          value={getValues().id}
          onChange={handleChange('id')}
          disabled={!!defaultValues?.id}
        />
        <TextInput
          required
          label={t('columns.city')}
          placeholder={t('columns.city')}
          value={getValues().city}
          onChange={handleChange('city')}
        />
        <TextInput
          required
          label={t('columns.locality')}
          placeholder={t('columns.locality')}
          value={getValues().locality}
          onChange={handleChange('locality')}
        />
        <TextInput
          required
          label={t('columns.postal_code')}
          placeholder={t('columns.postal_code')}
          value={getValues().postal_code}
          onChange={handleChange('postal_code')}
          type="number"
        />
        <TextInput
          required
          label={t('columns.latitude')}
          placeholder={t('columns.latitude')}
          value={getValues().latitude}
          onChange={handleChange('latitude')}
          type="number"
        />
        <TextInput
          required
          label={t('columns.longitude')}
          placeholder={t('columns.longitude')}
          value={getValues().longitude}
          onChange={handleChange('longitude')}
          type="number"
        />
      </div>
    </form>
  )
}
