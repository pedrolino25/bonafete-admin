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
  const monthsInRange: string[] = []
  const startMonth = new Date(data[0].month)
  const endMonth = new Date()

  // Generate all months between startMonth and endMonth
  let current = new Date(startMonth)
  while (current <= endMonth) {
    const formattedMonth = current.toISOString().slice(0, 7)
    monthsInRange.push(formattedMonth)
    current.setMonth(current.getMonth() + 1)
  }

  // Use a map to ensure unique months
  const monthMap = new Map<string, { month: string; spaces: string }>()

  // Add existing data to the map
  data.forEach((item) => {
    monthMap.set(item.month, item)
  })

  // Add missing months with default users = '0'
  monthsInRange.forEach((month) => {
    if (!monthMap.has(month)) {
      monthMap.set(month, { month, spaces: '0' })
    }
  })

  // Convert the map back to an array
  return Array.from(monthMap.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  )
}

export function fillMissingMonthsInUsersStatistics(
  data: { month: string; users: string }[]
) {
  const monthsInRange: string[] = []
  const startMonth = new Date(data[0].month)
  const endMonth = new Date()

  // Generate all months between startMonth and endMonth
  let current = new Date(startMonth)
  while (current <= endMonth) {
    const formattedMonth = current.toISOString().slice(0, 7)
    monthsInRange.push(formattedMonth)
    current.setMonth(current.getMonth() + 1)
  }

  // Use a map to ensure unique months
  const monthMap = new Map<string, { month: string; users: string }>()

  // Add existing data to the map
  data.forEach((item) => {
    monthMap.set(item.month, item)
  })

  // Add missing months with default users = '0'
  monthsInRange.forEach((month) => {
    if (!monthMap.has(month)) {
      monthMap.set(month, { month, users: '0' })
    }
  })

  // Convert the map back to an array
  return Array.from(monthMap.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  )
}

export function fillMissingMonthsInReservationsStatistics(
  data: { month: string; reservations: string }[]
) {
  const monthsInRange: string[] = []
  const startMonth = new Date(data[0].month)
  const endMonth = new Date()

  // Generate all months between startMonth and endMonth
  let current = new Date(startMonth)
  while (current <= endMonth) {
    const formattedMonth = current.toISOString().slice(0, 7)
    monthsInRange.push(formattedMonth)
    current.setMonth(current.getMonth() + 1)
  }

  // Use a map to ensure unique months
  const monthMap = new Map<string, { month: string; reservations: string }>()

  // Add existing data to the map
  data.forEach((item) => {
    monthMap.set(item.month, item)
  })

  // Add missing months with default users = '0'
  monthsInRange.forEach((month) => {
    if (!monthMap.has(month)) {
      monthMap.set(month, { month, reservations: '0' })
    }
  })

  // Convert the map back to an array
  return Array.from(monthMap.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  )
}

export function fillMissingMonthsInRevenueStatistics(
  data: {
    month: string
    revenue: string
    platformFee: string
    stripeFee: string
  }[]
) {
  const monthsInRange: string[] = []
  const startMonth = new Date(data[0].month)
  const endMonth = new Date()

  // Generate all months between startMonth and endMonth
  let current = new Date(startMonth)
  while (current <= endMonth) {
    const formattedMonth = current.toISOString().slice(0, 7)
    monthsInRange.push(formattedMonth)
    current.setMonth(current.getMonth() + 1)
  }

  // Use a map to ensure unique months
  const monthMap = new Map<
    string,
    { month: string; revenue: string; platformFee: string; stripeFee: string }
  >()

  // Add existing data to the map
  data.forEach((item) => {
    monthMap.set(item.month, item)
  })

  // Add missing months with default users = '0'
  monthsInRange.forEach((month) => {
    if (!monthMap.has(month)) {
      monthMap.set(month, {
        month,
        revenue: '0',
        platformFee: '0',
        stripeFee: '0',
      })
    }
  })

  // Convert the map back to an array
  return Array.from(monthMap.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  )
}
