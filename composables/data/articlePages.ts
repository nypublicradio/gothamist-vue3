import type { ArticlePage } from '../types/Page'
import type Author from '../types/Author'
import { normalizePage } from './basePages'

// Get a list of article pages using the Aviary /pages api
export function findArticlePages(queryParams: any) {
  const defaultParams = {
    type: 'news.ArticlePage',
    fields: ['ancestry', 'description', 'lead_asset', 'legacy_id', 'listing_image', 'publication_date', 'show_as_feature', 'sponsored_content', 'tags', 'updated_date', 'url', 'uuid', 'listing_title', 'listing_summary', 'related_authors'].join(','),
    order: '-publication_date',
    show_on_index_listing: true,
  }
  const params = Object.assign({}, defaultParams, queryParams)
  return useAviary('/pages/', { params })
}

// Get a list of article pages using the Aviary /search api
export function searchArticlePages(queryParams: any) {
  const params = Object.assign({}, queryParams)
  return useAviary('/search/', { params })
}

// Get a relative link to an article
function getArticleLink(articleData): string {
  if (articleData.ancestry)
    return `/${articleData.ancestry[0].slug}/${articleData.meta.slug}`

  else if (articleData.path)
    return articleData.path.replace('/home/', '/')

  return '/'
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
    url: author.slug && `/staff/${author.slug}`,
    socialMediaProfile: author.socialMediaProfile,
  }
}

// Transform page data from the API into a simpler and typed format
export function normalizeArticlePage(article: Record<string, any | undefined>): ArticlePage {
  if (typeof article === 'undefined')
    return undefined

  return Object.assign({}, normalizePage(article), {
    description: article.description,
    image: article.leadAsset?.[0]?.value?.image ?? article.leadAsset?.[0]?.value?.defaultImage,
    leadImageCaption: article.leadAsset?.[0]?.value?.caption || article.leadAsset?.[0]?.value?.image?.caption,
    imageLink: article.leadAsset?.[0]?.value?.imageLink,
    link: getArticleLink(article),

    leadAsset: article.leadAsset?.[0],
    leadImage: article.leadAsset?.[0]?.type === 'lead_image' ? article.leadAsset?.[0]?.value.image : undefined,
    leadGallery: article.leadAsset?.[0]?.type === 'lead_gallery' ? article.leadAsset?.[0]?.value : undefined,

    gallerySlides: article.leadAsset?.[0]?.type === 'lead_gallery' ? article.leadAsset?.[0]?.slides : undefined,
    legacyId: article.legacyId,
    authors: article.relatedAuthors?.map(normalizeAuthor),
    contributingOrganizations: article.relatedContributingOrganizations,
    sponsors: article.relatedSponsors,
    publicationDate: (article.publicationDate && new Date(article.publicationDate))
                         || (article.meta?.firstPublishedAt && new Date(article.meta?.firstPublishedAt)),
    updatedDate: article.updatedDate ? new Date(article.updatedDate) : undefined,
    showAsFeature: article.showAsFeature,
    sensitiveContent: article.sensitiveContent,
    provocativeContent: article.provocativeContent,
    sponsoredContent: article.sponsoredContent,
    relatedLinks: article.relatedLinks,
    tags: article.tags,
    url: article.url,
    section: { name: article.ancestry?.[0].title, slug: article.ancestry?.[0].slug },
    body: article.body,

    // curated images
    listingImage: article.listingImage ?? article.leadAsset?.[0]?.value?.image ?? article.leadAsset?.[0]?.value?.defaultImage,
    socialImage: article.socialImage ?? article.leadAsset?.[0]?.value?.image ?? article.leadAsset?.[0]?.value?.defaultImage,

    // for comments
    disableComments: article.disableComments,
    commentId: String(article.legacyId ?? article.uuid),
  })
}

// Transform page data from the API into a simpler and typed format
export function normalizeSearchResults(results: Record<string, any | undefined>): ArticlePage {
  return {
    id: results.result.id,
    type: results.result.type,
    title: results.result.listingTitle || results.result.title,
    description: results.result.description,
    image: results.result.image ?? results.result.leadAsset?.[0]?.value?.image ?? results.result.leadAsset?.[0]?.value?.defaultImage,
    leadImageCaption: results.result.leadAsset?.[0]?.value?.caption ?? results.result.leadAsset?.[0]?.value?.image?.caption,
    imageLink: results.result.leadAsset?.[0]?.value?.imageLink,
    link: getArticleLink(results.result),

    leadAsset: results.result.leadAsset?.[0],
    leadImage: results.result.leadAsset?.[0]?.type === 'lead_image' && results.result.leadAsset?.[0]?.value.image,
    leadGallery: results.result.leadAsset?.[0]?.type === 'lead_gallery' && results.result.leadAsset?.[0]?.value,

    gallerySlides: results.result.leadAsset?.[0]?.type === 'lead_gallery' && results.result.leadAsset?.[0]?.slides,
    legacyId: results.result.legacyId,
    authors: results.result.relatedAuthors?.map(normalizeAuthor),
    contributingOrganizations: results.result.relatedContributingOrganizations,
    sponsors: results.result.relatedSponsors,
    publicationDate: (results.result.publicationDate && new Date(results.result.publicationDate))
                         || (results.result.meta?.firstPublishedAt && new Date(results.result.meta?.firstPublishedAt)),
    updatedDate: results.result.updatedDate ? new Date(results.result.updatedDate) : undefined,
    showAsFeature: results.result.showAsFeature,
    sensitiveContent: results.result.sensitiveContent,
    provocativeContent: results.result.provocativeContent,
    sponsoredContent: results.result.sponsoredContent,
    relatedLinks: results.result.relatedLinks,
    tags: results.result.tags,
    url: results.result.url,
    uuid: results.result.uuid,
    section: { name: results.result.ancestry?.[0].title, slug: results.result.ancestry?.[0].slug },
    body: results.result.body,

    // for listing pages
    listingImage: results.result.listingImage || results.result.leadAsset?.[0]?.value?.image || results.result.leadAsset?.[0]?.value?.defaultImage,
    listingTitle: results.result.listingTitle || results.result.title,
    listingDescription: results.result.listingSummary || results.result.description,

    // for social/OG metadata
    socialImage: results.result.socialImage || results.result.leadAsset?.[0]?.value?.image || results.result.leadAsset?.[0]?.value?.defaultImage,
    socialTitle: results.result.socialTitle || results.result.title,
    socialDescription: results.result.socialText || results.result.description,

    seoTitle: results.result.meta?.seoTitle || results.result.title,
    searchDescription: results.result.meta?.searchDescription || results.result.description,

    // for comments
    disableComments: results.result.disableComments,
    commentId: String(results.result.legacyId || results.result.uuid),
  }
}

// Transform a list of article page data from the /pages API into a simpler and typed format
export function normalizeFindArticlePagesResponse(articlesResponse: any): ArticlePage[] {
  return articlesResponse.value?.items?.map(normalizeArticlePage)
}

// Transform a list of article page data from the /search API into a simpler and typed format
export function normalizeSearchArticlePagesResponse(articlesResponse: any): ArticlePage[] {
  return articlesResponse.value?.items?.map(normalizeSearchResults)
}
