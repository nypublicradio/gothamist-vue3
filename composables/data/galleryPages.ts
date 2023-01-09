import { GalleryPage } from "../types/Page"
import Slide from "../types/Slide"
import Image from "../types/Image"
import { normalizeArticlePage } from "./articlePages"

// Take a slide and return an image, with the caption override applied if it exists
function useImageFromSlideData(slideData: Record<string, any>):Image {
    const image = slideData.value.slideImage.image as Image
    const captionOverride = slideData.value.slideImage.caption
    if (captionOverride) {
        image.caption = captionOverride
    }
    return image
}

// Transform slide data from the API  into a simpler and typed format
export function normalizeSlide(slideData: Record<string, any>):Slide {
    return {
        title: slideData.value.slideTitle,
        image: useImageFromSlideData(slideData)
    }
}

// Transform gallery page data from the API into a simpler and typed format
export function normalizeGalleryPage(page: Record<string, any>):GalleryPage {
    const galleryPage = {
        id: page.id,
        uuid: page.uuid,
        title: page.title,
        description: page.description,
        url: page.url,

        slides: page.slides.map(normalizeSlide),

        authors: page.relatedAuthors,
        contributingOrganizations: page.relatedContributingOrganizations,
        relatedArticles: page.relatedArticles?.map(normalizeArticlePage),
        articleTitle: '',
        articleLink: '',

        listingTitle: page.listingTitle || page.title,
        listingDescription: page.listingSummary || page.description,
        listingImage: page.listingImage || page.slides[0] && useImageFromSlideData(page.slides[0]),

        socialTitle: page.socialTitle || page.title,
        socialDescription: page.socialText || page.description,
        socialImage:  page.socialImage || page.slides[0] && useImageFromSlideData(page.slides[0]),

        seoTitle: page.meta.seoTitle,
        searchDescription: page.meta.searchDescription
    }
    galleryPage.articleTitle = galleryPage.relatedArticles?.[0].title
    galleryPage.articleLink = galleryPage.relatedArticles?.[0].link
    return galleryPage
}
