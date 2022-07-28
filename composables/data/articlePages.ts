import { ArticlePage } from "../types/Page"
import Author from '../types/Author'

// get the 4 featured article pages
export async function findLatestArticlePages(queryParams: any) {
    const defaultParams = {
        type: 'news.ArticlePage',
        fields: ['ancestry', 'description', 'lead_asset', 'legacy_id', 'listing_image', 'publication_date', 'show_as_feature', 'sponsored_content', 'tags', 'updated_date', 'url', 'uuid', 'listing_title', 'listing_summary', 'related_authors'].join(','),
        order: '-publication_date',
        limit: 4,
        show_as_feature: true,
        show_on_index_listing: true,
    }
    const params = Object.assign({}, defaultParams, queryParams)
    return await useAviary('/pages/', { params })
}

// Get a list of article pages using the Aviary /pages api
export async function findArticlePages(queryParams: any) {
    const defaultParams = {
        type: 'news.ArticlePage',
        fields: ['ancestry', 'description', 'lead_asset', 'legacy_id', 'listing_image', 'publication_date', 'show_as_feature', 'sponsored_content', 'tags', 'updated_date', 'url', 'uuid', 'listing_title', 'listing_summary', 'related_authors'].join(','),
        order: '-publication_date',
        show_on_index_listing: true,
    }
    const params = Object.assign({}, defaultParams, queryParams)
    return await useAviary('/pages/', { params })
}

// Get a relative link to an article
function getArticleLink(articleData): string {
    if (articleData.ancestry) {
        return `/${articleData.ancestry[0].slug}/${articleData.meta.slug}`
    }
    else if (articleData.path) {
        return articleData.path.replace('/home/', '/')
    }
    else {
        return '/'
    }
}

// Transform author data from the API into a simpler and typed format
function normalizeAuthor(author: Record<string, any>): Author {
    return {
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        organization: author.contributingOrganization?.name,
        organizationUrl: author.contributingOrganization?.url,
        name: `${author.firstName} ${author.lastName}`,
        photoID: author.photo,
        jobTitle: author.jobTitle,
        biography: author.biography,
        website: author.website,
        email: author.email,
        slug: author.slug,
        url: author.slug && `/staff/${author.slug}`
    }
}

// Transform page data from the API into a simpler and typed format
export function normalizeArticlePage(article: Record<string, any>): ArticlePage {
    return {
        id: article.id,
        title: article.title,
        description: article.description,
        image: article.leadAsset?.[0].value.image ?? article.leadAsset?.[0].value.defaultImage,
        link: getArticleLink(article),

        leadAsset: article.leadAsset?.[0],
        leadImage: article.leadAsset?.[0].type === 'lead_image' && article.leadAsset?.[0].value.image,
        leadGallery: article.leadAsset?.[0].type === 'lead_gallery' && article.leadAsset?.[0].value,

        gallerySlides: article.leadAsset?.[0].type === 'lead_gallery' && article.leadAsset?.[0].slides,

        legacyId: article.legacyId,
        authors: article.relatedAuthors?.map(normalizeAuthor),
        contributingOrganizations: article.relatedContributingOrganizations,
        sponsors: article.relatedSponsors,
        publicationDate: new Date(article.publicationDate) || new Date(article.meta?.firstPublishedAt),
        updatedDate: article.updatedDate ? new Date(article.updatedDate) : undefined,
        showAsFeature: article.showAsFeature,
        sensitiveContent: article.sensitiveContent,
        provocativeContent: article.provocativeContent,
        sponsoredContent: article.sponsoredContent,
        tags: article.tags,
        url: article.url,
        uuid: article.uuid,
        section: { name: article.ancestry?.[0].title, slug: article.ancestry?.[0].slug },
        body: article.body,

        // for listing pages
        listingImage: article.listingImage || article.leadAsset?.[0].value?.image || article.leadAsset?.[0].value?.defaultImage,
        listingTitle: article.listingTitle || article.title,
        listingDescription: article.listingSummary || article.description,

        // for social/OG metadata
        socialImage: article.socialImage || article.leadAsset?.[0].value?.image || article.leadAsset?.[0].value?.defaultImage,
        socialTitle: article.socialTitle || article.title,
        socialDescription: article.socialText || article.description,

        seoTitle: article.meta?.seoTitle || article.title,
        searchDescription: article.meta?.searchDescription || article.description,
    }
}

// Transform a list of article page data from the API into a simpler and typed format
export function normalizeFindArticlePagesResponse(articlesResponse: any): ArticlePage[] {
    return articlesResponse.value.items?.map(normalizeArticlePage)
}

// Transform the featured article page data from the API into a simpler and typed format
// The home page featured article should display only the first story in the content collection
export function normalizeHomePageFeaturedArticle(article: Record<string, any>): ArticlePage {
    return {
        id: article.value.pageCollectionRelationship?.[0].pages?.[0].id,
        title: article.value.pageCollectionRelationship?.[0].pages?.[0].title,
        description: article.value.pageCollectionRelationship?.[0].pages?.[0].description,
        image: article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].value.image ?? article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].value.defaultImage,
        link: getArticleLink(article.value.pageCollectionRelationship?.[0].pages?.[0]),

        leadAsset: article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0],
        leadImage: article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].type === 'lead_image' && article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].value.image,
        leadGallery: article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].type === 'lead_gallery' && article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].value,

        gallerySlides: article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].type === 'lead_gallery' && article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].slides,

        legacyId: article.value.pageCollectionRelationship?.[0].pages?.[0].legacyId,
        authors: article.value.pageCollectionRelationship?.[0].pages?.[0].relatedAuthors?.map(normalizeAuthor),
        contributingOrganizations: article.value.pageCollectionRelationship?.[0].pages?.[0].relatedContributingOrganizations,
        sponsors: article.value.pageCollectionRelationship?.[0].pages?.[0].relatedSponsors,
        publicationDate: new Date(article.value.pageCollectionRelationship?.[0].pages?.[0].publicationDate) || new Date(article.value.pageCollectionRelationship?.[0].pages?.[0].meta?.firstPublishedAt),
        updatedDate: article.value.pageCollectionRelationship?.[0].pages?.[0].updatedDate ? new Date(article.value.pageCollectionRelationship?.[0].pages?.[0].updatedDate) : undefined,
        showAsFeature: article.value.pageCollectionRelationship?.[0].pages?.[0].showAsFeature,
        sensitiveContent: article.value.pageCollectionRelationship?.[0].pages?.[0].sensitiveContent,
        provocativeContent: article.value.pageCollectionRelationship?.[0].pages?.[0].provocativeContent,
        sponsoredContent: article.value.pageCollectionRelationship?.[0].pages?.[0].sponsoredContent,
        tags: article.value.pageCollectionRelationship?.[0].pages?.[0].tags,
        url: article.value.pageCollectionRelationship?.[0].pages?.[0].url,
        uuid: article.value.pageCollectionRelationship?.[0].pages?.[0].uuid,
        section: { name: article.value.pageCollectionRelationship?.[0].pages?.[0].ancestry?.[0].title, slug: article.value.pageCollectionRelationship?.[0].pages?.[0].ancestry?.[0].slug },
        body: article.value.pageCollectionRelationship?.[0].pages?.[0].body,

        // for listing pages
        listingImage: article.value.pageCollectionRelationship?.[0].pages?.[0].listingImage || article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].value?.image || article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].value?.defaultImage,
        listingTitle: article.value.pageCollectionRelationship?.[0].pages?.[0].listingTitle || article.value.pageCollectionRelationship?.[0].pages?.[0].title,
        listingDescription: article.value.pageCollectionRelationship?.[0].pages?.[0].listingSummary || article.value.pageCollectionRelationship?.[0].pages?.[0].description,

        // for social/OG metadata
        socialImage: article.value.pageCollectionRelationship?.[0].pages?.[0].socialImage || article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].value?.image || article.value.pageCollectionRelationship?.[0].pages?.[0].leadAsset?.[0].value?.defaultImage,
        socialTitle: article.value.pageCollectionRelationship?.[0].pages?.[0].socialTitle || article.value.pageCollectionRelationship?.[0].pages?.[0].title,
        socialDescription: article.value.pageCollectionRelationship?.[0].pages?.[0].socialText || article.value.pageCollectionRelationship?.[0].pages?.[0].description,

        seoTitle: article.value.pageCollectionRelationship?.[0].pages?.[0].meta?.seoTitle || article.value.pageCollectionRelationship?.[0].pages?.[0].title,
        searchDescription: article.value.pageCollectionRelationship?.[0].pages?.[0].meta?.searchDescription || article.value.pageCollectionRelationship?.[0].pages?.[0].description,
    }
}