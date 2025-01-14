import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

export enum ReservationStatus {
  Confirmed = 'confirmed',
  CancelledByHost = 'cancelled-by-host',
  CancelledByClient = 'cancelled-by-client',
  Pending = 'pending',
}

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
}

const getReservationsList = async (
  status: string
): Promise<GetReservationsItemResponse[]> => {
  const response = await fetch(
    `${ROOT}/api/reservations/admin-reservations?status=${status}`,
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

export { getReservationsList }
