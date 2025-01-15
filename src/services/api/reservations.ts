import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

export interface GetReservationsItemResponse {
  id: string
  reservation_id: string
  date: string
  attendance: string
  status: string
  client_name: string
  client_id: string
  host_name: string
  host_id: string
  space_name: string
  space_id: string
  amount: string
  refunded_amount: string
  platform_fee_amount: string
  created_at: string
  charge_id: string
  platform_stripe_fee: string
  net: string
  payment_id: string
  payment_date: string
  line_items: string
}

const getReservationsList = async (
  status: string
): Promise<GetReservationsItemResponse[]> => {
  const response = await fetch(
    `${ROOT}/api/admin/reservations?status=${status}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
      },
    }
  )
  return response.json()
}

export interface GetAllAvailabiltyVerificationsWithChatItemResponse {
  id: string
  date: string
  number_of_persons: string
  status: string
  created_at: string
  user: {
    id: string
    name: string
  }
  space_visit_status: string
  space_visit_date: string
  chat: {
    id: string
    pending: number
    count: number
    messages: {
      id: string
      from: {
        id: string
        name: string
      }
      to: {
        id: string
        name: string
      }
      message: string
      status: string
      created_at: string
    }[]
  }
}

const getAvailabilityVerificationsList = async (): Promise<
  GetAllAvailabiltyVerificationsWithChatItemResponse[]
> => {
  const response = await fetch(`${ROOT}/api/admin/availability-verifications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

export { getAvailabilityVerificationsList, getReservationsList }
