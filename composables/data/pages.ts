import { normalizePage, WAGTAIL_PAGE_TYPES } from './basePages'
import { normalizeArticlePage } from './articlePages'
import { normalizeGalleryPage } from './galleryPages'
import { normalizeTagPage } from './tagPages'
import { Page, ArticlePage, TagPage, InformationPage } from "../types/Page"

export async function findPage(htmlPath: string) {
    const params = { html_path: htmlPath }
    return useAviary('/pages/find/', { params })
}

// Get a page by it's cms id
export async function usePageById(pageId: number) {
    return useAviary(`/pages/${pageId}/`)
}

export function normalizeInformationPage(page: Record<string, any>): InformationPage {
    return Object.assign({}, normalizePage(page), { body: page.body })
}

export function normalizeFindPageResponse(pageResponse: Record<string, any>): Page | ArticlePage | TagPage | InformationPage {
    const pageType = pageResponse.value?.meta?.type
    switch (WAGTAIL_PAGE_TYPES[pageType]) {
        case 'article_page':
            return normalizeArticlePage(pageResponse.value)
        case 'gallery':
            return normalizeGalleryPage(pageResponse.value)
        case 'tag_page':
            return normalizeTagPage(pageResponse.value)
        case 'information_page':
            return normalizeInformationPage(pageResponse.value)
        default:
            return normalizePage(pageResponse.value)
    }
}