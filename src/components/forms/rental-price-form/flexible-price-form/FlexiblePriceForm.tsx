'use client'

import { TextInput } from '@/components/inputs/text-input/text-input'
import { EditSpaceFormsLayout } from '@/components/layouts/edit-space-forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, Euro } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface FlexiblePriceFormProps {
  defaultValues?: FlexiblePriceFormType
  onChange?: (values: FlexiblePriceFormType) => void
}

export const flexiblePriceFormSchema = z.object({
  base_price: z.string().min(1, 'base_price_not_defined'),
  time_limit: z.string().min(1, 'time_limit_not_defined'),
  price_after: z.string().min(1, 'price_after_not_defined'),
})

export type FlexiblePriceFormType = z.infer<typeof flexiblePriceFormSchema>

export default function FlexiblePriceForm({
  defaultValues,
  onChange,
}: FlexiblePriceFormProps) {
  const t = useTranslations()

  const {
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<FlexiblePriceFormType>({
    resolver: zodResolver(flexiblePriceFormSchema),
    defaultValues,
  })

  const handleChange =
    (field: keyof FlexiblePriceFormType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.replace(/[.,]/g, '')
      setValue(field, value, { shouldValidate: true, shouldDirty: true })
    }

  const base_price = watch('base_price')
  const time_limit = watch('time_limit')
  const price_after = watch('price_after')

  useEffect(() => {
    if (isValid) {
      onChange?.(getValues())
    }
  }, [isValid, base_price, time_limit, price_after])

  return (
    <EditSpaceFormsLayout.Container>
      <TextInput
        data-testid="base_price"
        value={getValues('base_price')}
        onChange={handleChange('base_price')}
        placeholder={'0'}
        type="number"
        labelSmall
        label={t('sections.onboarding.rental-form.base-price')}
        fixedEndAdornment={
          <div className="px-3 pt-2.5 text-sm">
            <Euro className="h-4 w-4" />
          </div>
        }
        error={
          errors.base_price?.message
            ? t(`error-messages.${errors.base_price?.message}`)
            : undefined
        }
      />
      <TextInput
        data-testid="time_limit"
        labelSmall
        label={t('sections.onboarding.rental-form.time-limit')}
        placeholder={'0'}
        value={getValues('time_limit')}
        onChange={handleChange('time_limit')}
        type="number"
        fixedEndAdornment={
          <div className="px-3 pt-2.5 text-sm">
            <Clock className="h-4 w-4" />
          </div>
        }
        error={
          errors.time_limit?.message
            ? t(`error-messages.${errors.time_limit?.message}`)
            : undefined
        }
      />
      <TextInput
        data-testid="price_after"
        labelSmall
        label={t('sections.onboarding.rental-form.price-after')}
        placeholder={'0'}
        value={getValues('price_after')}
        onChange={handleChange('price_after')}
        type="number"
        fixedEndAdornment={
          <div className="px-3 pt-2.5 text-sm">
            <Euro className="h-4 w-4" />
          </div>
        }
        error={
          errors.price_after?.message
            ? t(`error-messages.${errors.price_after?.message}`)
            : undefined
        }
      />
      {isValid && (
        <EditSpaceFormsLayout.Info>
          {t(
            'sections.onboarding.rental-form.explanation-messages.hourly-flexible-price'
          )
            .replace('$1', base_price)
            .replace('$2', time_limit)
            .replace('$3', price_after)}
        </EditSpaceFormsLayout.Info>
      )}
    </EditSpaceFormsLayout.Container>
  )
}
