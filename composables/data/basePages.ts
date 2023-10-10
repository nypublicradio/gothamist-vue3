import type { Page } from '../types/Page'

export const WAGTAIL_PAGE_TYPES = {
  'gallery.GalleryPage': 'gallery',
  'news.ArticlePage': 'article_page',
  'standardpages.IndexPage': 'section_page',
  'standardpages.InformationPage': 'information_page',
  'tagpages.TagPage': 'tag_page',
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
    preventSearchIndexing: page.preventSearchIndexing,

    socialTitle: page.socialTitle || page.title,
    socialDescription: page.socialText || page.description,
    socialImage: page.socialImage,

    seoTitle: page.meta?.seoTitle || page.title,
    searchDescription: page.meta?.searchDescription || page.title,
  }
}
