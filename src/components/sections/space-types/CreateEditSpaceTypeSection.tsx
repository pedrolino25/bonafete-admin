'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { TextInput } from '@/components/inputs/text-input/text-input'
import { toast } from '@/lib/hooks/use-toast'
import { createUpdateSpaceType } from '@/services/api/reference-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const spaceTypeFormSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  image: z.string().optional(),
})

export type SpaceTypeFormType = z.infer<typeof spaceTypeFormSchema>

interface CreateEditSpaceTypeSectionProps {
  defaultValues?: SpaceTypeFormType
}

export default function CreateEditSpaceTypeSection({
  defaultValues,
}: CreateEditSpaceTypeSectionProps) {
  const t = useTranslations()
  const router = useRouter()

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<SpaceTypeFormType>({
    mode: 'onChange',
    resolver: zodResolver(spaceTypeFormSchema),
    defaultValues,
  })

  const onSubmit = (values: SpaceTypeFormType) => {
    createUpdateSpaceTypeMutation.mutate({
      id: values.id,
      label: values.label,
      image: values.image,
    })
  }

  const createUpdateSpaceTypeMutation = useMutation({
    mutationFn: createUpdateSpaceType,
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
    (field: keyof SpaceTypeFormType) =>
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
              ? t('sections.space-types.edit-title')
              : t('sections.space-types.create-title')}
          </h3>
          <p className="text-sm font-light text-utility-gray-500 pt-1 pr-4">
            {defaultValues
              ? t('sections.space-types.edit-subtitle')
              : t('sections.space-types.create-subtitle')}
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
        <TextInput
          required
          label={t('columns.id')}
          placeholder={t('columns.id')}
          value={getValues().id}
          onChange={handleChange('id')}
        />
        <TextInput
          required
          label={t('columns.label')}
          placeholder={t('columns.label')}
          value={getValues().label}
          onChange={handleChange('label')}
        />
        <TextInput
          label={t('columns.image')}
          placeholder={t('columns.image')}
          value={getValues().image}
          onChange={handleChange('image')}
        />
      </div>
    </form>
  )
}
