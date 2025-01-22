import { Option } from '@/components/ui/select'

interface AvailableHourOptionsProps {
  fromDeviation?: number
  toDeviation?: number
  returnEmptyForUnavailable?: boolean
}

export const getAvailableHourOptions = (
  hoursList: Option[],
  from: Option[],
  to?: Option[],
  options?: AvailableHourOptionsProps
): Option[] => {
  if (
    options?.returnEmptyForUnavailable &&
    (from.length === 0 || from[0].value === '--:--')
  ) {
    return []
  }

  if (from.length > 0 && hoursList.length > 0) {
    const fromIndex = hoursList.findIndex(
      (option) => option.label === from[0].label
    )

    const toIndex =
      to && to[0]?.label
        ? hoursList.findIndex((option) => option.label === to[0].label) + 1
        : 0

    if (fromIndex >= 0 && toIndex > 0) {
      const updatedOptions = hoursList.slice(
        fromIndex + (options?.fromDeviation || 0),
        toIndex + (options?.toDeviation || 0)
      )
      return updatedOptions
    } else if (fromIndex >= 0) {
      const updatedOptions = hoursList.slice(
        fromIndex + (options?.fromDeviation || 0)
      )
      return updatedOptions
    }
    return hoursList
  } else {
    return []
  }
}

export const calculatePercentageDifference = (
  oldValue: number,
  newValue: number
): number => {
  if (oldValue === 0) {
    return 0
  }
  const percentageDifference = ((newValue - oldValue) / oldValue) * 100
  return percentageDifference
}

export function fillMissingMonthsInSpacesStatistics(
  data: { month: string; spaces: string }[]
) {
  const monthsInRange = []
  const startMonth = new Date(data[0].month)
  const endMonth = new Date()

  // Generate all months between startMonth and endMonth
  let current = new Date(startMonth)
  while (current <= endMonth) {
    const formattedMonth = current.toISOString().slice(0, 7)
    monthsInRange.push(formattedMonth)
    current.setMonth(current.getMonth() + 1)
  }

  // Map through the generated months and merge with existing data
  return monthsInRange.map((month) => {
    const existing = data.find((item) => item.month === month)
    return existing ? existing : { month, spaces: '0' }
  })
}

export function fillMissingMonthsInUsersStatistics(
  data: { month: string; users: string }[]
) {
  const monthsInRange = []
  const startMonth = new Date(data[0].month)
  const endMonth = new Date()

  // Generate all months between startMonth and endMonth
  let current = new Date(startMonth)
  while (current <= endMonth) {
    const formattedMonth = current.toISOString().slice(0, 7)
    monthsInRange.push(formattedMonth)
    current.setMonth(current.getMonth() + 1)
  }

  // Map through the generated months and merge with existing data
  return monthsInRange.map((month) => {
    const existing = data.find((item) => item.month === month)
    return existing ? existing : { month, users: '0' }
  })
}

export function fillMissingMonthsInReservationsStatistics(
  data: { month: string; reservations: string }[]
) {
  const monthsInRange = []
  const startMonth = new Date(data[0].month)
  const endMonth = new Date()

  // Generate all months between startMonth and endMonth
  let current = new Date(startMonth)
  while (current <= endMonth) {
    const formattedMonth = current.toISOString().slice(0, 7)
    monthsInRange.push(formattedMonth)
    current.setMonth(current.getMonth() + 1)
  }

  // Map through the generated months and merge with existing data
  return monthsInRange.map((month) => {
    const existing = data.find((item) => item.month === month)
    return existing ? existing : { month, reservations: '0' }
  })
}

export function fillMissingMonthsInRevenueStatistics(
  data: {
    month: string
    revenue: string
    platformFee: string
    stripeFee: string
  }[]
) {
  const monthsInRange = []
  const startMonth = new Date(data[0].month)
  const endMonth = new Date()

  let current = new Date(startMonth)
  while (current <= endMonth) {
    const formattedMonth = current.toISOString().slice(0, 7)
    monthsInRange.push(formattedMonth)
    current.setMonth(current.getMonth() + 1)
  }

  return monthsInRange.map((month) => {
    const existing = data.find((item) => item.month === month)
    return existing
      ? existing
      : { month, revenue: '0', platformFee: '0', stripeFee: '0' }
  })
}
