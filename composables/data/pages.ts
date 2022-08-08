import { normalizeArticlePage } from './articlePages'
import { normalizeGalleryPage } from './galleryPages'
import { normalizeTagPage } from './tagPages'
import { Page, ArticlePage, TagPage } from "../types/Page"

export async function findPage(htmlPath: string) {
    let params = { html_path: htmlPath }
    return await useAviary('/pages/find', {params})
}

// Get a page by it's cms id
export async function usePageById(pageId: number) {
    return await useAviary(`/pages/${pageId}`)
}

export function normalizeFindPageResponse(pageResponse: Record<string, any>): Page | ArticlePage | TagPage {
    const pageType = pageResponse.value?.meta?.type
    switch (pageType) {
        case 'news.ArticlePage':
            return normalizeArticlePage(pageResponse.value)
        case 'gallery.GalleryPage':
            return normalizeGalleryPage(pageResponse.value)
        case 'tagpages.TagPage':
            return normalizeTagPage(pageResponse.value)
        default:
            return normalizePage(pageResponse.value)
    }
}

export function normalizePage(page: Record<string, any>): Page {
    return {
        id: page.id,
        title: page.title,
        uuid: page.uuid
    }
}