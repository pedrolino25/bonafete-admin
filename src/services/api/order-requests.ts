import { OrderRequestStatus } from '@/lib/utils/consts'
import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

export interface GetOrderRequestsItemResponse {
  id: string
  date: string
  time_init: string
  time_end: string
  number_of_persons: string
  status: string
  user_name: string
  user_id: string
  locality: string
  party_type: string
  created_at: string
  services: {
    id: string
    label: string
  }[]
}

const getOrderRequestsByStatusList = async (
  status: OrderRequestStatus
): Promise<GetOrderRequestsItemResponse[]> => {
  const response = await fetch(`${ROOT}/api/admin/orders?status=${status}`, {
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

export interface GetOrderRequestResponse {
  id: string
  date: string
  time_init: string
  time_end: string
  number_of_persons: string
  status: string
  user_name: string
  user_picture: string
  user_email: string
  user_phone: string
  user_id: string
  locality: string
  party_type: string
  created_at: string
  services: {
    id: string
    label: string
  }[]
}

const getOrderRequest = async (
  id: string
): Promise<GetOrderRequestResponse> => {
  const response = await fetch(`${ROOT}/api/order?id=${id}`, {
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

export interface GetAvailableOffersResponse {
  space_id: string
  space_title: string
}

const getAvailableOffers = async (
  filters: string
): Promise<GetAvailableOffersResponse[]> => {
  const response = await fetch(
    `${ROOT}/api/order/available-offers?filters=${filters}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
      },
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export { getAvailableOffers, getOrderRequest, getOrderRequestsByStatusList }
