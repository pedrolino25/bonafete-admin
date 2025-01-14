import { SpaceStatus } from '@/lib/utils/consts'
import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

export interface SpaceListItemResponse {
  id: string
  name: string
  business_model: string
  targets: string[]
  created_at: string
  type: string
  host_name: string
  host_id: string
  locality: string
}

const getSpacesListByStatus = async (
  status: SpaceStatus
): Promise<SpaceListItemResponse[]> => {
  const response = await fetch(
    `${ROOT}/api/onboarding/spaces-list?status=${status}`,
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

interface UpdateSpaceStatusProps {
  id: string
  status: SpaceStatus
}

const updateSpaceStatus = async (
  data: UpdateSpaceStatusProps
): Promise<SpaceListItemResponse> => {
  const response = await fetch(`${ROOT}/api/onboarding/space-status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export { getSpacesListByStatus, updateSpaceStatus }
