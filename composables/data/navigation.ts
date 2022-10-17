import Navigation from "../types/Navigation"

export async function findNavigation() {
    const config = useRuntimeConfig()
    return await useAviary(`/navigation/${config.navigationId}`, {}, false)
}

export function normalizeFindNavigationResponse(nav: Record<string, any>): Navigation {
    return nav.value as Navigation
}
