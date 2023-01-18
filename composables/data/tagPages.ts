import { TagPage } from "../types/Page"

export function normalizeFindTagPageResponse (tagPageResponse: Record<string, any>): TagPage {
    return tagPageResponse.value.items?.map(normalizeTagPage)
}

export function normalizeTagPage(page: Record<string, any>): TagPage {
    return {
        id: page.id,
        title: page.title,
        uuid: page.uuid,
        headerImage: page.designedHeader[0]?.value.image,
        topPageZone: page.topPageZone,
        midPageZone: page.midpageZone,
        // for listing pages
        listingImage: page.listingImage,
        listingTitle: page.listingTitle || page.title,
        listingDescription: page.listingSummary,

        // for social/OG metadata
        socialImage: page.socialImage,
        socialTitle: page.socialTitle || page.title,
        socialDescription: page.socialText,

        seoTitle: page.meta?.seoTitle || page.title,
        searchDescription: page.meta?.searchDescription,
    }
}
