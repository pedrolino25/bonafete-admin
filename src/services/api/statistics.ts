import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

const getAdminStatistics = async (): Promise<any> => {
  const response = await fetch(`${ROOT}/api/admin/statistics`, {
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

export { getAdminStatistics }
