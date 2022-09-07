import humps from 'humps'

function transformResponseData(data: Record<string, any>): Record<string, any> {
    return humps.camelizeKeys(data)
}

export default async function useAviary(path: string, options: Record<string, any> = {}) {
    const config = useRuntimeConfig()
    // manually a generating fetch key here as a workaround for an issue in nuxt3 rc6
    // https://github.com/nuxt/framework/issues/5993
    const key = path + JSON.stringify(options)
    const { data, error } = await useFetch(path, { baseURL: config['API_URL'], key, ...options })
    const transformedData = transformResponseData(data)
    return { data: transformedData, error }
}