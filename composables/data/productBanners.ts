import { ProductBanner } from './types'

export async function findProductBanners(id?: number) {
    const config = useRuntimeConfig()
    id = id ?? config.ProductBannersId
    return await useAviary('/system_messages/${id}')
}

export function normalizeFindProductBannersResponse(productBannersData: Record<string, any>): ProductBanner[] {
    return productBannersData.value.items?.map(normalizeProductBanner)
}

export function normalizeProductBanner(banner: Record<string, any>): ProductBanner {
    return {
        title: banner.value.title,
        description: banner.value.description,
        buttonText: banner.value.buttonText,
        buttonLink: banner.value.buttonLink,
        frequencyInHours: banner.value.frequency,
        location: banner.value.location
    }
}