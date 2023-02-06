import { TagPage } from "../types/Page"
import { normalizePage } from "./pages"

export function normalizeFindTagPageResponse (tagPageResponse: Record<string, any>): TagPage {
    return tagPageResponse.value.items?.map(normalizeTagPage)
}

export function normalizeTagPage(page: Record<string, any>): TagPage {
    return Object.assign({}, normalizePage(page), {
        headerImage: page.designedHeader[0]?.value.image,
        topPageZone: page.topPageZone,
        midPageZone: page.midpageZone,
    })
}
