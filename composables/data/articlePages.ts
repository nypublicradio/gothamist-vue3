import { ArticlePage } from "../types/Page"
import Author from '../types/Author'

export async function findArticlePages(queryParams: any) {
    const defaultParams  = {
     type: 'news.ArticlePage',
     fields: ['ancestry','description','lead_asset','legacy_id','listing_image','publication_date','show_as_feature','sponsored_content','tags','updated_date','url','uuid','listing_title','listing_summary'].join(','),
     order: '-publication_date',
     show_on_index_listing: true,
    }
    let params = Object.assign({}, defaultParams, queryParams)
    return await useAviary('/pages/', {params})
}

export function normalizeFindArticlePagesResponse (articlesResponse: any): ArticlePage[] {
    return articlesResponse.value.items?.map(normalizeArticlePage)
}

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
        authors: article.relatedAuthors.map(normalizeAuthor),
        contributingOrganizations: article.relatedContributingOrganizations,
        sponsors: article.relatedSponsors,
        publicationDate: new Date(article.publicationDate),
        updatedDate: article.updatedDate ? new Date(article.updatedDate) : undefined,
        showAsFeature: article.showAsFeature,
        sponsoredContent: article.sponsoredContent,
        tags: article.tags,
        url: article.url,
        uuid: article.uuid,
        section: { name: article.ancestry[0].title, slug: article.ancestry[0].slug },
        body: article.body,

        // for listing pages
        listingImage: article.listingImage ?? article.leadAsset[0]?.image ?? article.leadAsset[0]?.defaultImage,
        listingTitle: article.listingTitle ?? article.title,
        listingDescription: article.listingSummary ?? article.description,

        // for social/OG metadata
        socialImage: article.socialImage ?? article.leadAsset[0]?.image ?? article.leadAsset[0]?.defaultImage,
        socialTitle: article.socialTitle ?? article.title,
        socialDescription: article.socialText ?? article.description,
    }
}

function normalizeAuthor(author:Record<string, any>): Author {
    return {
        id: author.id,
        name: `${author.firstName} ${author.lastName}`,
        photoID: author.photo,
        jobTitle: author.jobTitle,
        biography: author.biography,
        website: author.website,
        email: author.email,
        slug: author.slug
    }
}
