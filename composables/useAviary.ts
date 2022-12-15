import humps from 'humps'
import { hash } from 'ohash'

export function transformResponseData(data: Record<string, any>): Record<string, any> {
    return humps.camelizeKeys(data)
}

export default async function useAviary(path: string, options: Record<string, any> = {}, refresh = true) {
    const config = useRuntimeConfig()
    // Sets a timestamp to include in the values used to create the
    // fetch key, to force a refresh of the local caching
    const refreshTimestamp = refresh ? Number(new Date()) : 0
    // manually a generating fetch key here as a workaround for an issue in nuxt3 rc6
    // https://github.com/nuxt/framework/issues/5993
    const key = hash(['aviary', path, options, refreshTimestamp])
    const { data, error } = await useFetch(path, { baseURL: config['API_URL'], key, initialCache: false, ...options })
    const transformedData = transformResponseData(data)
    return { data: transformedData, error }
}