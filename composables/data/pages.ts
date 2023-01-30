import { normalizeArticlePage } from './articlePages'
import { normalizeGalleryPage } from './galleryPages'
import { normalizeTagPage } from './tagPages'
import { Page, ArticlePage, TagPage, InformationPage } from "../types/Page"

const WAGTAIL_PAGE_TYPES = {
    "gallery.GalleryPage": 'gallery',
    "news.ArticlePage": 'article_page',
    "standardpages.IndexPage": 'section_page',
    "standardpages.InformationPage": 'information_page',
    "tagpages.TagPage": 'tag_page'
}

export async function findPage(htmlPath: string) {
    const params = { html_path: htmlPath }
    return await useAviary('/pages/find', { params })
}

// Get a page by it's cms id
export async function usePageById(pageId: number) {
    return await useAviary(`/pages/${pageId}`)
}

export function normalizePage(page: Record<string, any>): Page {
    return {
        id: page.id,
        title: page.title,
        uuid: page.uuid,
        type: WAGTAIL_PAGE_TYPES[page.meta?.type] || 'unknown',
    
        listingTitle: page.listingTitle || page.title,
        listingDescription: page.listingSummary || page.description,
        listingImage: page.listingImage,
    
        socialTitle: page.socialTitle || page.title,
        socialDescription: page.socialText || page.description,
        socialImage: page.socialImage,
    
        seoTitle: page.meta?.seoTitle || page.title,
        searchDescription: page.meta?.searchDescription || page.title
    }
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