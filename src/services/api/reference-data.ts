import { getCookie } from 'cookies-next'
import { Cookies } from '../auth'

const ROOT = process.env.NEXT_PUBLIC_API_URL

export interface GetCountriesItemResponse {
  id: string
  title: string
  latitude: number
  longitude: number
  radius: number
  url: string
}

const getCountriesList = async (): Promise<GetCountriesItemResponse[]> => {
  const response = await fetch(`${ROOT}/api/reference-data/countries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

const getCountry = async (id: string): Promise<GetCountriesItemResponse> => {
  const response = await fetch(`${ROOT}/api/reference-data/country?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

export interface DeleteCountryParams {
  id: string
}

const deleteCountry = async (
  data: DeleteCountryParams
): Promise<CreateUpdateCountryParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/country`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface CreateUpdateCountryParams {
  id: string
  title: string
  latitude: number
  longitude: number
  radius: number
  url: string
}

const createUpdateCountry = async (
  data: CreateUpdateCountryParams
): Promise<CreateUpdateCountryParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/countries`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface GetLocalitiesItemResponse {
  id: string
  title: string
  latitude: number
  longitude: number
  radius: number
  url: string
}

const getLocalitiesList = async (): Promise<GetLocalitiesItemResponse[]> => {
  const response = await fetch(`${ROOT}/api/reference-data/localities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

const getLocality = async (id: string): Promise<GetLocalitiesItemResponse> => {
  const response = await fetch(`${ROOT}/api/reference-data/locality?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

export interface DeleteLocalityParams {
  id: string
}

const deleteLocality = async (
  data: DeleteLocalityParams
): Promise<CreateUpdateLocalityParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/locality`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface CreateUpdateLocalityParams {
  id?: string
  title: string
  latitude: number
  longitude: number
  radius: number
  url: string
}

const createUpdateLocality = async (
  data: CreateUpdateLocalityParams
): Promise<CreateUpdateLocalityParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/localities`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface SpaceConveniencesItemResponse {
  id: string
  label: string
  type: string
  image: string
}

const getSpaceConveniencesList = async (): Promise<
  SpaceConveniencesItemResponse[]
> => {
  const response = await fetch(`${ROOT}/api/reference-data/conveniences`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

const getSpaceConvenience = async (
  id: string
): Promise<SpaceConveniencesItemResponse> => {
  const response = await fetch(
    `${ROOT}/api/reference-data/convenience?id=${id}`,
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

export interface DeleteSpaceConvenienceParams {
  id: string
}

const deleteSpaceConvenience = async (
  data: DeleteSpaceConvenienceParams
): Promise<CreateUpdateSpaceConvenienceParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/convenience`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface CreateUpdateSpaceConvenienceParams {
  id?: string
  label: string
  type: string
  image?: string
}

const createUpdateSpaceConvenience = async (
  data: CreateUpdateSpaceConvenienceParams
): Promise<CreateUpdateSpaceConvenienceParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/conveniences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface SpaceTypeListItemResponse {
  id: string
  label: string
  image?: string
}

const getSpaceTypesList = async (): Promise<SpaceTypeListItemResponse[]> => {
  const response = await fetch(`${ROOT}/api/reference-data/space-types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

const getSpaceType = async (id: string): Promise<SpaceTypeListItemResponse> => {
  const response = await fetch(
    `${ROOT}/api/reference-data/space-type?id=${id}`,
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

export interface DeleteSpaceTypeParams {
  id: string
}

const deleteSpaceType = async (
  data: DeleteSpaceTypeParams
): Promise<CreateUpdateSpaceTypeParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/space-type`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface CreateUpdateSpaceTypeParams {
  id?: string
  label: string
  image?: string
}

const createUpdateSpaceType = async (
  data: CreateUpdateSpaceTypeParams
): Promise<CreateUpdateSpaceTypeParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/space-types`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface SpaceTargetListItemResponse {
  id: string
  label: string
  description?: string
  url: string
}

const getSpaceTargetsList = async (): Promise<
  SpaceTargetListItemResponse[]
> => {
  const response = await fetch(`${ROOT}/api/reference-data/events-types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

const getSpaceTarget = async (
  id: string
): Promise<SpaceTargetListItemResponse> => {
  const response = await fetch(
    `${ROOT}/api/reference-data/events-type?id=${id}`,
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

export interface DeleteSpaceTargetsParams {
  id: string
}

const deleteSpaceTarget = async (
  data: DeleteSpaceTargetsParams
): Promise<CreateUpdateSpaceTargetParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/events-type`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface CreateUpdateSpaceTargetParams {
  id?: string
  label: string
  description?: string
  url: string
}

const createUpdateSpaceTarget = async (
  data: CreateUpdateSpaceTargetParams
): Promise<CreateUpdateSpaceTargetParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/events-types`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface PostalCodesListItemResponse {
  id: string
  city: string
  locality: string
  postalCode: string
  latitude: number
  longitude: number
}

const getPostalCodesList = async (): Promise<PostalCodesListItemResponse[]> => {
  const response = await fetch(`${ROOT}/api/reference-data/postal-codes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

const getPostalCode = async (
  id: string
): Promise<PostalCodesListItemResponse> => {
  const response = await fetch(
    `${ROOT}/api/reference-data/postal-code?id=${id}`,
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

export interface DeletePostalCodeParams {
  id: string
}

const deletePostalCode = async (
  data: DeletePostalCodeParams
): Promise<CreateUpdatePostalCodeParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/postal-code`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface CreateUpdatePostalCodeParams {
  id?: string
  city: string
  locality: string
  postalCode: string
  latitude: number
  longitude: number
}

const createUpdatePostalCode = async (
  data: CreateUpdatePostalCodeParams
): Promise<CreateUpdatePostalCodeParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/postal-codes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface ServicesCategoriesListItemResponse {
  id: string
  key: string
  value: string
}

const getServicesCategoriesList = async (): Promise<
  ServicesCategoriesListItemResponse[]
> => {
  const response = await fetch(
    `${ROOT}/api/reference-data/services-categories`,
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

const getServicesCategory = async (
  id: string
): Promise<ServicesCategoriesListItemResponse> => {
  const response = await fetch(
    `${ROOT}/api/reference-data/services-category?id=${id}`,
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

export interface DeleteServicesCategoryParams {
  id: string
}

const deleteServicesCategory = async (
  data: DeleteServicesCategoryParams
): Promise<CreateUpdateServicesCategoryParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/services-category`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface CreateUpdateServicesCategoryParams {
  id?: string
  key: string
  value: string
}

const createUpdateServicesCategory = async (
  data: CreateUpdateServicesCategoryParams
): Promise<CreateUpdateServicesCategoryParams> => {
  const response = await fetch(
    `${ROOT}/api/reference-data/services-categories`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
      },
      body: JSON.stringify(data),
    }
  )
  return response.json()
}

export interface ServicesListItemResponse {
  id: string
  key: string
  value: string
  serviceCategoryId: {
    id: string
    key: string
    value: string
  }
}

const getServicesList = async (): Promise<ServicesListItemResponse[]> => {
  const response = await fetch(`${ROOT}/api/reference-data/services`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

const getService = async (id: string): Promise<ServicesListItemResponse> => {
  const response = await fetch(`${ROOT}/api/reference-data/service?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
  })
  return response.json()
}

export interface DeleteServiceParams {
  id: string
}

const deleteService = async (
  data: DeleteServiceParams
): Promise<CreateUpdateServicesParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/service`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export interface CreateUpdateServicesParams {
  id?: string
  key: string
  value: string
  serviceCategoryId: { id: string }
}

const createUpdateService = async (
  data: CreateUpdateServicesParams
): Promise<CreateUpdateServicesParams> => {
  const response = await fetch(`${ROOT}/api/reference-data/services`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Autorization: getCookie(Cookies.SESSION_COOKIE) as string,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export {
  createUpdateCountry,
  createUpdateLocality,
  createUpdatePostalCode,
  createUpdateService,
  createUpdateServicesCategory,
  createUpdateSpaceConvenience,
  createUpdateSpaceTarget,
  createUpdateSpaceType,
  deleteCountry,
  deleteLocality,
  deletePostalCode,
  deleteService,
  deleteServicesCategory,
  deleteSpaceConvenience,
  deleteSpaceTarget,
  deleteSpaceType,
  getCountriesList,
  getCountry,
  getLocalitiesList,
  getLocality,
  getPostalCode,
  getPostalCodesList,
  getService,
  getServicesCategoriesList,
  getServicesCategory,
  getServicesList,
  getSpaceConvenience,
  getSpaceConveniencesList,
  getSpaceTarget,
  getSpaceTargetsList,
  getSpaceType,
  getSpaceTypesList,
}
