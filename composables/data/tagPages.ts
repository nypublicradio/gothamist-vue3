import { TagPage } from './types'

export function normalizeFindTagPageResponse (tagPageResponse: any): TagPage {
    return tagPageResponse.value.items?.map(normalizeTagPage)
}

export function normalizeTagPage(page: Record<string, any>): TagPage {
    return {
        id: page.id,
        title: page.title,
        uuid: page.uuid,
        headerImage: page.designedHeader?.length ? page.designedHeader[0].value : undefined,
        topPageZone: page.topPageZone,
        midPageZone: page.midpageZone
    }
}
