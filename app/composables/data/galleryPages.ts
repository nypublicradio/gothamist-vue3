import type { GalleryPage } from '../types/Page'
import type Slide from '../types/Slide'
import type Image from '../types/Image'
import { normalizePage } from './basePages'
import { normalizeArticlePage } from './articlePages'

// Take a slide and return an image, with the caption override applied if it exists
function useImageFromSlideData(slideData: Record<string, any>): Image {
  const image = slideData.value.slideImage.image as Image
  const captionOverride = slideData.value.slideImage.caption
  if (captionOverride)
    image.caption = captionOverride

  return image
}

// Transform slide data from the API  into a simpler and typed format
export function normalizeSlide(slideData: Record<string, any>): Slide {
  return {
    title: slideData.value.slideTitle,
    image: useImageFromSlideData(slideData),
  }
}

// Transform gallery page data from the API into a simpler and typed format
export function normalizeGalleryPage(page: Record<string, any>): GalleryPage {
  const galleryPage = Object.assign({}, normalizePage(page), {
    description: page.description,
    url: page.url,

    slides: page.slides.map(normalizeSlide),

    authors: page.relatedAuthors,
    contributingOrganizations: page.relatedContributingOrganizations,
    relatedArticles: page.relatedArticles?.map(normalizeArticlePage),
    articleTitle: '',
    articleLink: '',

    listingImage: page.listingImage || (page.slides[0] && useImageFromSlideData(page.slides[0])),
    socialImage: page.socialImage || (page.slides[0] && useImageFromSlideData(page.slides[0])),
  }) as GalleryPage
  // when an article is not published, it does not included the relatedArticle in the gallery data, so we dont have reference to the parent article.
  const isRelatedArticles = galleryPage.relatedArticles?.length > 0

  galleryPage.articleTitle = isRelatedArticles ? galleryPage.relatedArticles?.[0].title : galleryPage.title
  galleryPage.articleLink = isRelatedArticles ? galleryPage.relatedArticles?.[0].link : null
  return galleryPage
}
