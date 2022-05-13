import humps from 'humps'
import { normalizeArticle } from './articles'
import { Page } from './types'

export async function findPage(htmlPath: string) {
    const config = useRuntimeConfig()
    let params = { html_path: htmlPath }
    const {data, error} = await useFetch('/pages/find', { baseURL: config['API_URL'], params })
    return { data, error }
}

export function normalizeFindPageResponse(pageResponse):Page {
    if (pageResponse.value.meta.type === 'news.ArticlePage') {
        return normalizeArticle(pageResponse.value)
    }
    return normalizePage(pageResponse.value)
}

export function normalizePage(pageData):Page {
    const page = humps.camelizeKeys(pageData)
    return {
        id: page.id,
        title: page.title,
        uuid: page.uuid
    }
}

