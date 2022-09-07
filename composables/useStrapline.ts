
export default async function useStrapline() {
    const homePageData = await usePageById(3)
    return await homePageData.data.value?.strapline || "A non-profit newsroom, powered by WNYC."
}