import { LotationFormType } from '@/components/forms/lotation-form/LotationForm'
import { CustomPriceFormType } from '@/components/forms/rental-price-form/custom-price-form/CustomPriceForm'
import { FixedPriceFormType } from '@/components/forms/rental-price-form/fixed-price-form/FixedPriceForm'
import { FlexiblePriceFormType } from '@/components/forms/rental-price-form/flexible-price-form/FlexiblePriceForm'
import { ScheduleFormType } from '@/components/forms/schedule-form/ScheduleForm'
import { SpacePackageFormType } from '@/components/forms/space-package-form/SpacePackageForm'
import { SpaceServiceFormType } from '@/components/forms/space-service-form/SpaceServiceForm'
import { CancellationPolicyFormType } from '@/components/sections/edit-space/space-cancellation-policy/SpaceCancellationPolicySection'
import { SpaceBusinessModel, SpaceStatus } from '@/lib/utils/consts'
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
  const response = await fetch(`${ROOT}/api/space/list?status=${status}`, {
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

interface UpdateSpaceStatusProps {
  id: string
  status: SpaceStatus
}

const updateSpaceStatus = async (
  data: UpdateSpaceStatusProps
): Promise<SpaceListItemResponse> => {
  const response = await fetch(`${ROOT}/api/space/status`, {
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

export interface SpaceType {
  id: string
  label: string
}

export interface SpaceTarget {
  id: string
  label: string
  url: string
}

export interface SpaceConvenience {
  id: string
  label: string
}

export interface SpaceInfo {
  host_id: string
  space_id: string
  max_of_persons?: number
  photos?: string[]
  targets?: SpaceTarget[]
  type?: SpaceType
  conveniences?: SpaceConvenience[]
  title?: string
  tour?: string
  description?: string
  allow_pets?: string
  allow_alcool?: string
  allow_smoking?: string
  allow_high_sound?: string
  has_security_cameras?: string
  rules?: string
  street?: string
  postal?: string
  locality?: string
  city?: string
  latitude?: number
  longitude?: number
  lotation?: LotationFormType
  min_hours?: number
  business_model?: SpaceBusinessModel
  cancellation_policy?: CancellationPolicyFormType
  schedule?: ScheduleFormType
  prices?: {
    priceModel?: { value: string; label: string }[]
    fixed?: FixedPriceFormType
    flexible?: FlexiblePriceFormType
    custom?: CustomPriceFormType
  }
  cleaning_fee?: number
  packages?: SpacePackageFormType[]
  services?: SpaceServiceFormType[]
}

const getSpaceById = async (id: string): Promise<SpaceInfo> => {
  const response = await fetch(`${ROOT}/api/onboarding/space?id=${id}`, {
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

export interface UpdateSpacePackageParameters {
  onboarding_id?: string
  space_id: string
  id?: string
  name: string
  services: { spaceService: { id: string }; hours?: string }[]
  description: string
  schedule: SpaceSchedule[]
  min_hours: string
  min_persons: string
  max_persons: string
}

const updateSpacePackage = async (
  data: UpdateSpacePackageParameters
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/offers/package`, {
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

export interface DeleteSpacePackageParameters {
  id: string
}

const deleteSpacePackage = async (
  data: DeleteSpacePackageParameters
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/offers/package`, {
    method: 'DELETE',
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

export interface UpdateSpaceServiceParameters {
  onboarding_id?: string
  space_id: string
  id?: string
  description?: string
  photos: string
  price_modality: string
  price: string
  min_hours?: string
  min_persons?: string
  packages_only: string
  mandatory: string
  service_id: string
}

const updateSpaceService = async (
  data: UpdateSpaceServiceParameters
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/offers/service`, {
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

export interface DeleteSpaceServiceParameters {
  id: string
}

const deleteSpaceService = async (
  data: DeleteSpaceServiceParameters
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/offers/service`, {
    method: 'DELETE',
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

export interface SpacePrice {
  type: string
  amount: number
  amountAfter?: number
  duration?: number
  timeStart?: string
  timeEnd?: string
  space: { id: string }
  createdAt: Date
}

export interface SpaceSchedule {
  weekDay: string
  timeStart: string
  timeEnd: string
  space: { id: string }
  createdAt: Date
}

export interface CancelationPolicy {
  afterConfimation: number
  period: number
  afterPeriod: number
  space: { id: string }
  createdAt: Date
}

export interface UpdateSpaceOffersRentalParameters {
  onboarding_id?: string
  space_id: string
  business_model: SpaceBusinessModel
  prices: SpacePrice[]
  price_modality: string
  cancellation_policy: CancelationPolicy
  min_hours: number
}

const updateSpaceOffersRental = async (
  data: UpdateSpaceOffersRentalParameters
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/rental`, {
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

export interface ListItem {
  id: string
  label: string
}

export interface SaveSpaceInfoProps {
  space_id: string
  onboarding_id?: string
  type?: ListItem
  targets?: ListItem[]
  conveniences?: ListItem[]
  title?: string
  tour?: string
  description?: string
  street?: string
  postal?: string
  locality?: string
  city_id?: string
  city?: string
  latitude?: number
  longitude?: number
  schedule?: SpaceSchedule[]
  lotation?: number
}

const updateSpaceInfo = async (data: SaveSpaceInfoProps): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/info`, {
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

export interface SaveOnboardingSpaceRulesProps {
  space_id: string
  onboarding_id?: string
  allow_pets?: string
  allow_alcool?: string
  allow_smoking?: string
  allow_high_sound?: string
  has_security_cameras?: string
  rules?: string
}

const updateSpaceRules = async (
  data: SaveOnboardingSpaceRulesProps
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/rules`, {
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

export interface SaveOnboardingSpaceGeneralConfigurationProps {
  space_id: string
  onboarding_id?: string
  business_model: SpaceBusinessModel
  min_hours: number
  cleaning_fee: SpacePrice
}

const updateSpaceGeneralConfiguration = async (
  data: SaveOnboardingSpaceGeneralConfigurationProps
): Promise<unknown> => {
  const response = await fetch(
    `${ROOT}/api/space/offers/general-configuration`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export interface SaveOnboardingSpaceRentalProps {
  space_id: string
  onboarding_id?: string
  prices: SpacePrice[]
  price_modality: string
}

const updateSpaceRental = async (
  data: SaveOnboardingSpaceRentalProps
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/offers/rental`, {
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

export interface SaveOnboardingSpaceCancellationPolicyProps {
  space_id: string
  onboarding_id?: string
  cancellation_policy: CancelationPolicy
}

const updateSpaceCancellationPolicy = async (
  data: SaveOnboardingSpaceCancellationPolicyProps
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/cancellation-policy`, {
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

export interface SaveOnboardingSpacePhotosProps {
  space_id: string
  onboarding_id?: string
  photos?: string[]
}

const updateSpacePhotos = async (
  data: SaveOnboardingSpacePhotosProps
): Promise<unknown> => {
  const response = await fetch(`${ROOT}/api/space/photos`, {
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

const verifySpaceTitle = async (title: string, id: string): Promise<string> => {
  const response = await fetch(
    `${ROOT}/api/space/verify-title?url=${title}&id=${id}`,
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

export interface SpaceServiceListItemResponse {
  id: string
  priceModel: string
  min_hours: string
  min_persons: string
  service: {
    id: string
    key: string
    value: string
    serviceCategory: {
      id: string
      key: string
      value: string
    }
  }
}

const getSpaceServicesList = async (
  space_id: string
): Promise<SpaceServiceListItemResponse[]> => {
  const response = await fetch(`${ROOT}/space-services-list?id=${space_id}`, {
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

export interface ServiceListItemResponse {
  id: string
  key: string
  value: string
  serviceCategory: {
    id: string
    key: string
    value: string
  }
}

const getServicesList = async (): Promise<ServiceListItemResponse[]> => {
  const response = await fetch(`${ROOT}/static/services-list`, {
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

function getServicesCategories(
  items: ServiceListItemResponse[]
): { value: string; label: string }[] {
  if (!items || items.length === 0) return []
  const uniqueCategories = new Map<string, { value: string; label: string }>()

  items.forEach((item) => {
    const { id, value } = item.serviceCategory
    if (!uniqueCategories.has(id)) {
      uniqueCategories.set(id, { value: id, label: value })
    }
  })

  return Array.from(uniqueCategories.values())
}

interface ServiceListItemProps {
  key: string
  value: string
  serviceCategory: {
    id: string
  }
}

const addService = async (
  data: ServiceListItemProps
): Promise<ServiceListItemProps> => {
  const response = await fetch(`${ROOT}/static/services-list`, {
    method: 'POST',
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

export {
  addService,
  deleteSpacePackage,
  deleteSpaceService,
  getServicesCategories,
  getServicesList,
  getSpaceById,
  getSpaceServicesList,
  getSpacesListByStatus,
  updateSpaceCancellationPolicy,
  updateSpaceGeneralConfiguration,
  updateSpaceInfo,
  updateSpaceOffersRental,
  updateSpacePackage,
  updateSpacePhotos,
  updateSpaceRental,
  updateSpaceRules,
  updateSpaceService,
  updateSpaceStatus,
  verifySpaceTitle,
}
