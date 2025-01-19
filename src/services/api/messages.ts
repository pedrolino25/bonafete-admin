import { BlockMessageReason } from '@/lib/utils/consts'
import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

export interface BlockMessageParams {
  id: string
  reason: BlockMessageReason
}

const blockMessage = async (data: BlockMessageParams): Promise<void> => {
  const response = await fetch(`${ROOT}/api/admin/message/block`, {
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

export { blockMessage }
