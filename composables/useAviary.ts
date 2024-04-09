import humps from 'humps'

export function transformResponseData(data: Record<string, any>): Record<string, any> {
  return humps.camelizeKeys(data)
}

export default async function useAviary(path: string, options: Record<string, any> = {}) {
  const config = useRuntimeConfig()

  // don't save the query string in the payload
  const { payload } = useNuxtApp()
  delete payload?.path

  const { data, error } = await useFetch(path, { baseURL: config.public.API_URL, ...options })
  const transformedData = transformResponseData(data)
  return { data: transformedData, error }
}
