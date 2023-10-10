import type BreakingNews from '../types/BreakingNews'

export function findBreakingNews() {
  const config = useRuntimeConfig()
  return useAviary(`/sitewide_components/${config.public.sitewideComponentsId}/`)
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
    description: newsItem.value.description,
  }
}
