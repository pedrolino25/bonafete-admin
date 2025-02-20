'use client'

import { Calendar } from '@/components/ui/calendar-rac'
import { DateInput } from '@/components/ui/datefield-rac'
import { cn } from '@/lib/utils'
import { fromDate } from '@internationalized/date'
import { CalendarIcon } from 'lucide-react'
import {
  Button,
  DatePicker as DatePickerComponent,
  DateValue,
  Dialog,
  Group,
  Label,
  Popover,
} from 'react-aria-components'

interface DatePickerProps {
  label?: string
  labelSmall?: boolean
  defaultValue?: Date
  onChange: (value: Date) => void
}

export default function DatePicker({
  label,
  labelSmall,
  defaultValue,
  onChange,
}: DatePickerProps) {
  const onDateChange = (value: DateValue | null) => {
    if (value?.year && value?.month && value?.day) {
      onChange(new Date(value.year, value.month - 1, value.day))
    }
  }

  return (
    <DatePickerComponent
      className="space-y-2 w-full"
      onChange={onDateChange}
      defaultValue={
        defaultValue
          ? fromDate(
              defaultValue,
              Intl.DateTimeFormat().resolvedOptions().timeZone
            )
          : undefined
      }
    >
      <Label
        className={cn(
          'text-sm font-medium text-utility-gray-700 p-0 m-0 mb-1.5',
          labelSmall && 'text-xs font-light text-utility-gray-600'
        )}
      >
        {label}
      </Label>
      <div className="flex">
        <Group className="w-full">
          <DateInput className="pe-9" />
        </Group>
        <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70">
          <CalendarIcon size={16} strokeWidth={2} />
        </Button>
      </div>
      <Popover
        className="z-50 rounded-lg border border-border bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <Calendar />
        </Dialog>
      </Popover>
    </DatePickerComponent>
  )
}
