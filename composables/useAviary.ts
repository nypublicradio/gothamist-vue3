import humps from 'humps'
import { hash } from 'ohash'

export function transformResponseData(data: Record<string, any>): Record<string, any> {
    return humps.camelizeKeys(data)
}

export default async function useAviary(path: string, options: Record<string, any> = {}, refresh = true) {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(path, { baseURL: config.public['API_URL'], ...options })
    const transformedData = transformResponseData(data)
    return { data: transformedData, error }
}