import ProductBanner from "../types/ProductBanner"

export async function findProductBanners() {
    const config = useRuntimeConfig()
    return await useAviary(`/system_messages/${config.systemMessagesId}`)
}

export function normalizeFindProductBannersResponse(productBannersData: Record<string, any>): ProductBanner[] {
    return productBannersData.value?.productBanners?.map(normalizeProductBanner) ?? []
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