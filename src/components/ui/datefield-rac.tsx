'use client'

import { cn } from '@/lib/utils'
import {
  type DateFieldProps,
  DateField as DateFieldRac,
  type DateInputProps as DateInputPropsRac,
  DateInput as DateInputRac,
  type DateSegmentProps,
  DateSegment as DateSegmentRac,
  type DateValue as DateValueRac,
  type TimeFieldProps,
  TimeField as TimeFieldRac,
  type TimeValue as TimeValueRac,
  composeRenderProps,
} from 'react-aria-components'

const DateField = <T extends DateValueRac>({
  className,
  children,
  ...props
}: DateFieldProps<T>) => {
  return (
    <DateFieldRac
      className={composeRenderProps(className, (className) =>
        cn('space-y-2', className)
      )}
      {...props}
    >
      {children}
    </DateFieldRac>
  )
}

const TimeField = <T extends TimeValueRac>({
  className,
  children,
  ...props
}: TimeFieldProps<T>) => {
  return (
    <TimeFieldRac
      className={composeRenderProps(className, (className) =>
        cn('space-y-2', className)
      )}
      {...props}
    >
      {children}
    </TimeFieldRac>
  )
}

const DateSegment = ({ className, ...props }: DateSegmentProps) => {
  return (
    <DateSegmentRac
      className={composeRenderProps(className, (className) =>
        cn(
          'inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50',
          className
        )
      )}
      {...props}
    />
  )
}

const dateInputStyle =
  'relative inline-flex h-10 px-3.5 py-2.5 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background text-sm w-full shadow-xs rounded-lg border border-utility-gray-300 bg-white text-base font-light placeholder:text-utility-gray-400 text-utility-gray-900 hover:placeholder:text-utility-gray-900 disabled:cursor-not-allowed disabled:bg-utility-gray-50 disabled:!text-utility-gray-500 disabled:hover:!text-utility-gray-500 disabled:hover:placeholder:!text-utility-gray-500 focus-within:outline-none focus-within:border-utility-brand-300 focus-within:shadow-brand-md'

interface DateInputProps extends DateInputPropsRac {
  className?: string
  unstyled?: boolean
}

const DateInput = ({
  className,
  unstyled = false,
  ...props
}: Omit<DateInputProps, 'children'>) => {
  return (
    <DateInputRac
      className={composeRenderProps(className, (className) =>
        cn(!unstyled && dateInputStyle, className)
      )}
      {...props}
    >
      {(segment) => <DateSegment segment={segment} />}
    </DateInputRac>
  )
}

export { DateField, DateInput, DateSegment, TimeField, dateInputStyle }
export type { DateInputProps }
