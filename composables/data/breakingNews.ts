import { BreakingNews } from './types'

export async function findBreakingNews(id?: number) {
    const config = useRuntimeConfig()
    id = id ?? config.BreakingNewsId
    return await useAviary('/system_messages/${id}')
}

export function normalizeFindBreakingNewsResponse(breakingNewsData: Record<string, any>): BreakingNews[] {
    return breakingNewsData.value.items?.map(normalizeBreakingNews)
}

export function normalizeBreakingNews(newsItem: Record<string, any>): BreakingNews {
    return {
        title: newsItem.value.title,
        link: newsItem.value.link,
        description: newsItem.value.description
    }
}