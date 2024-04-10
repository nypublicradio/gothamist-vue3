import humps from 'humps'

export function transformResponseData(data: Record<string, any>): Record<string, any> {
  return humps.camelizeKeys(data)
}

export default async function useAviary(path: string, options: Record<string, any> = {}) {
  const config = useRuntimeConfig()
  const { data, error } = await useFetch(path, { baseURL: config.public.API_URL, ...options })
    .then((response) => {
      if (process.client && response.error.value && response.error.value.statusCode !== 404) {
        const { $sentry } = useNuxtApp()
        $sentry.captureException(response.error.value)
      }
      return response
    })
  const transformedData = transformResponseData(data)
  return { data: transformedData, error }
}
