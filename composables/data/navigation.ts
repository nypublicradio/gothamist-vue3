import Navigation from "../types/Navigation"

export function findNavigation() {
    const config = useRuntimeConfig()
    return useAviary(`/navigation/${config.public.navigationId}`, {})
}

export function normalizeFindNavigationResponse(nav: Record<string, any>): Navigation {
    return nav.value as Navigation
}
