import BreakingNews from "../types/BreakingNews"

export async function findBreakingNews() {
    const config = useRuntimeConfig()
    return await useAviary(`/sitewide_components/${config.public.sitewideComponentsId}`)
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