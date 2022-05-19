import { Navigation } from './types'

export async function findNavigation(id?: number) {
    const config = useRuntimeConfig()
    id = id ?? config.navigationId
    return await useAviary('/navigation/${id}')
}

export function normalizeFindNavigationResponse(nav: Record<string, any>): Navigation {
    return nav.value as Navigation
}
