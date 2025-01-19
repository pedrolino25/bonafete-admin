import { HostStatus, SpaceStatus } from '@/lib/utils/consts'
import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

export interface HostsListItemResponse {
  id: string
  account_id: string
  name: string
  email: string
  phone: string
  locality: string
  business_type: string
  created_at: string
}

const getHostsListByStatus = async (
  status: HostStatus
): Promise<HostsListItemResponse[]> => {
  const response = await fetch(`${ROOT}/api/host/list?status=${status}`, {
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

export interface SpaceInfoResponse {
  id: string
  title?: string
  url?: string
  max_persons?: number
  status?: SpaceStatus
  business_model?: string
  photos?: string[]
}

export interface ReservationsInfoResponse {
  id: string
  reservation_id: string
  created_at: string
  status: string
  date: string
  client_name: string
  client_id: string
  amount: string
  charge_id: string
  platform_fee: string
  platform_stripe_fee: string
  refund_amount: string
  net: string
  payment_id: string
  payment_date: string
  line_items: string
}

export interface HostResponse {
  id: string
  account_id: string
  type: string
  name: string
  email: string
  phone: string
  picture: string
  status: HostStatus
  spaces: SpaceInfoResponse[]
  reservations: ReservationsInfoResponse[]
}

const getHost = async (id: string): Promise<HostResponse> => {
  const response = await fetch(`${ROOT}/api/admin/host?id=${id}`, {
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

export interface ClientReservationsInfoResponse {
  id: string
  reservation_id: string
  status: string
  date: string
  created_at: string
  host_name: string
  host_id: string
  amount: string
  charge_id: string
  platform_fee: string
  platform_stripe_fee: string
  refund_amount: string
  net: string
  payment_id: string
  payment_date: string
  line_items: string
}

export interface ClientResponse {
  id: string
  name: string
  email: string
  phone: string
  picture: string
  reservations: ClientReservationsInfoResponse[]
}

const getClient = async (id: string): Promise<ClientResponse> => {
  const response = await fetch(`${ROOT}/api/admin/client?id=${id}`, {
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

export { getClient, getHost, getHostsListByStatus }
