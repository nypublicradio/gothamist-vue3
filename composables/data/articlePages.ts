import { ArticlePage } from "../types/Page"
import Author from '../types/Author'

// get the 4 featured article pages
export async function findFeaturedArticlePages(queryParams: any) {
    const defaultParams  = {
     type: 'news.ArticlePage',
     fields: ['ancestry','description','lead_asset','legacy_id','listing_image','publication_date','show_as_feature','sponsored_content','tags','updated_date','url','uuid','listing_title','listing_summary','related_authors'].join(','),
     order: '-publication_date',
     limit: 4,
     show_as_feature: true,
     show_on_index_listing: true,
    }
    const params = Object.assign({}, defaultParams, queryParams)
    return await useAviary('/pages/', {params})
}

// get article pages
export async function findArticlePages(queryParams: any) {
    const defaultParams  = {
     type: 'news.ArticlePage',
     fields: ['ancestry','description','lead_asset','legacy_id','listing_image','publication_date','show_as_feature','sponsored_content','tags','updated_date','url','uuid','listing_title','listing_summary','related_authors'].join(','),
     order: '-publication_date',
     show_on_index_listing: true,
    }
    let params = Object.assign({}, defaultParams, queryParams)
    return await useAviary('/pages/', {params})
}

// normalize the article page data
export function normalizeFindArticlePagesResponse (articlesResponse: any): ArticlePage[] {
    return articlesResponse.value.items?.map(normalizeArticlePage)
}

// normalize the article page data
export function normalizeArticlePage(article: Record<string, any>): ArticlePage {
    return {
        id: article.id,
        title: article.title,
        description: article.description,
        image:  article.leadAsset[0].value.image ?? article.leadAsset[0]?.value.defaultImage,
        link: `/${article.ancestry[0].slug}/${article.meta.slug}`,

        leadAsset: article.leadAsset?.[0],
        leadImage: article.leadAsset[0]?.type === 'lead_image' && article.leadAsset[0]?.value.image,
        leadGallery: article.leadAsset[0]?.type === 'lead_gallery' && article.leadAsset[0]?.value,
        
        gallerySlides: article.leadAsset[0]?.type === 'lead_gallery' && article.leadAsset[0]?.slides,

        legacyId: article.legacyId,
        authors: article.relatedAuthors?.map(normalizeAuthor),
        contributingOrganizations: article.relatedContributingOrganizations,
        sponsors: article.relatedSponsors,
        publicationDate: new Date(article.publicationDate) ||  new Date(article.meta?.firstPublishedAt),
        updatedDate: article.updatedDate ? new Date(article.updatedDate) : undefined,
        showAsFeature: article.showAsFeature,
        sensitiveContent: article.sensitiveContent,
        provocativeContent: article.provocativeContent,
        sponsoredContent: article.sponsoredContent,
        tags: article.tags,
        url: article.url,
        uuid: article.uuid,
        section: { name: article.ancestry[0].title, slug: article.ancestry[0].slug },
        body: article.body,

        // for listing pages
        listingImage: article.listingImage || article.leadAsset[0]?.value?.image || article.leadAsset[0]?.value?.defaultImage,
        listingTitle: article.listingTitle || article.title,
        listingDescription: article.listingSummary || article.description,

        // for social/OG metadata
        socialImage: article.socialImage || article.leadAsset[0]?.value?.image || article.leadAsset[0]?.value?.defaultImage,
        socialTitle: article.socialTitle || article.title,
        socialDescription: article.socialText || article.description,

        seoTitle: article.meta.seoTitle || article.title,
        searchDescription: article.meta.searchDescription || article.description,
    }
}

// normalize the author data
function normalizeAuthor(author:Record<string, any>): Author {
    return {
        firstName: author.firstName,
        lastName: author.lastName,
        url: author.slug && `/staff/${author.slug}`,
        organization: author.contributingOrganization?.name,
        organizationUrl: author.contributingOrganization?.url
    }
}
