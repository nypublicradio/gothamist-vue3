import { normalizeArticlePage } from './articlePages'
import { Page } from './types'

export async function findPage(htmlPath: string) {
    let params = { html_path: htmlPath }
    return await useAviary('/pages/find', {params})
}

export function normalizeFindPageResponse(pageResponse: Record<string, any>): Page {
    if (pageResponse.value.meta.type === 'news.ArticlePage') {
        return normalizeArticlePage(pageResponse.value)
    }
    return normalizePage(pageResponse.value)
}

export function normalizePage(page: Record<string, any>): Page {
    return {
        id: page.id,
        title: page.title,
        uuid: page.uuid
    }
}

