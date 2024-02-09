import humps from 'humps'

export function transformResponseData(data: Record<string, any>): Record<string, any> {
  return humps.camelizeKeys(data)
}

export default async function useAviary(path: string, options: Record<string, any> = {}) {
  const config = useRuntimeConfig()

  const { data, error } = await useFetch(path, { baseURL: config.API_URL ?? config.public.API_URL, key: path, ...options })
  const transformedData = transformResponseData(data)
  return { data: transformedData, error }
}
