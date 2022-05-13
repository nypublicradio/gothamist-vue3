import humps from 'humps'
import { Article } from './types'

export async function findArticles(queryParams: any) {
    const config = useRuntimeConfig()
    const defaultParams  = {
     type: 'news.ArticlePage',
     fields: ['ancestry','description','lead_asset','legacy_id','listing_image','publication_date','show_as_feature','sponsored_content','tags','updated_date','url','uuid','listing_title','listing_summary'].join(','),
     order: '-publication_date',
     show_on_index_listing: true,
     limit: 4,
     show_as_feature: true,
     sponsored_content: false,
    }
    let params = Object.assign({}, defaultParams, queryParams)
    const {data, error} = await useFetch('/pages/', { baseURL: config['API_URL'], params })
    return { data, error }
}

export function normalizeFindArticlesResponse (articlesResponse: any): Article[] {
    return articlesResponse.value.items?.map(normalizeArticle)
}

export function normalizeArticle(articleData: any): Article {
    const article = humps.camelizeKeys(articleData)
    return {
        id: article.id,
        title: article.title,
        description: article.description,
        image:  article.leadAsset[0].value.image ?? article.leadAsset[0].value.defaultImage,
        link: `/${article.ancestry[0].slug}/${article.meta.slug}`,

        leadAsset: article.leadAsset?.length ? article.leadAsset[0] : undefined,
        leadImage: article.leadAsset?.[0].type === 'lead_image' ? article.leadAsset[0].value.image : undefined,
        leadGallery: article.leadAsset?.[0].type === 'lead_gallery' ? article.leadAsset[0].value : undefined,
        
        gallerySlides: article.leadAsset?.[0].type === 'lead_gallery' ? article.leadAsset[0].slides : undefined,

        legacyId: article.legacyId,
        publicationDate: new Date(article.publicationDate),
        updatedDate: article.updatedDate ? new Date(article.updatedDate) : undefined,
        showAsFeature: article.showAsFeature,
        sponsoredContent: article.sponsoredContent,
        tags: article.tags,
        url: article.url,
        uuid: article.uuid,
        section: { name: article.ancestry[0].title, slug: article.ancestry[0].slug },

        // for listing pages
        listingImage: article.listingImage ?? article.leadAsset?.[0].image ?? article.leadAsset?.[0].defaultImage,
        listingTitle: article.listingTitle ?? article.title,
        listingDescription: article.listingSummary ?? article.description,

        // for social/OG metadata
        socialImage: article.socialImage ?? article.leadAsset?.[0].image ?? article.leadAsset?.[0].defaultImage,
        socialTitle: article.socialTitle ?? article.title,
        socialDescription: article.socialText ?? article.description,
    }
}
