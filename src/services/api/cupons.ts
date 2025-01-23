import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

export interface CuponsListItemResponse {
  id: string
  type: string
  code: string
  value: string
  is_percentage: boolean
  min_reservation: string
  expire_at: string
  status: string
}

const getCuponsList = async (): Promise<CuponsListItemResponse[]> => {
  const response = await fetch(`${ROOT}/api/admin/cupons`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export interface CuponConfiguration {
  id?: string
  type: string
  code: string
  percentage: number
  fixed: number
  minReservationValue: number
  expirationHours: number
  status: string
  createdAt?: Date
  updatedAt?: Date
}

const getCupon = async (id: string): Promise<CuponConfiguration> => {
  const response = await fetch(`${ROOT}/api/admin/cupon?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

const createUpdateCupon = async (
  data: CuponConfiguration
): Promise<CuponConfiguration> => {
  const response = await fetch(`${ROOT}/api/admin/cupon`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export interface AniversaryCuponsListItemResponse {
  month: string
  number_of_users: string
  used: string
}

const getAniversaryCuponsList = async (): Promise<
  AniversaryCuponsListItemResponse[]
> => {
  const response = await fetch(`${ROOT}/api/admin/cupons/aniversary`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

const sendAniversaryCupons = async (): Promise<void> => {
  const response = await fetch(`${ROOT}/cupon/aniversary/send`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify([]),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export {
  createUpdateCupon,
  getAniversaryCuponsList,
  getCupon,
  getCuponsList,
  sendAniversaryCupons,
}
