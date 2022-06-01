import BreakingNews from "../types/BreakingNews"

export async function findBreakingNews(id?: number) {
    const config = useRuntimeConfig()
    id = id ?? config.sitewideComponentsId
    return await useAviary(`/sitewide_components/${id}`)
}

export function normalizeFindBreakingNewsResponse(breakingNewsData: Record<string, any>): BreakingNews[] {
    return breakingNewsData.value?.breakingNews
        ?.filter(newsItem => newsItem.value)
        .map(normalizeBreakingNews) ?? []
}

export function normalizeBreakingNews(newsItem: Record<string, any>): BreakingNews {
    return {
        title: newsItem.value.title,
        link: newsItem.value.link,
        description: newsItem.value.description
    }
}