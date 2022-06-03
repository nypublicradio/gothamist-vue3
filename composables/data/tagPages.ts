import { TagPage } from "../types/Page"

export function normalizeFindTagPageResponse (tagPageResponse: Record<string, any>): TagPage {
    return tagPageResponse.value.items?.map(normalizeTagPage)
}

export function normalizeTagPage(page: Record<string, any>): TagPage {
    return {
        id: page.id,
        title: page.title,
        uuid: page.uuid,
        headerImage: page.designedHeader[0]?.value,
        topPageZone: page.topPageZone,
        midPageZone: page.midpageZone
    }
}
