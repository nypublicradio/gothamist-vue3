export interface Tag {
    name: string,
    slug?: string
}

export interface Image {
    id: number,
    title: string,
    width: number,
    height: number,
    alt: string,
    caption?: string,
    credit?: string,
    credit_link?: string,
    file?: string,
}

export interface Page {
    id: number,
    title: string,
    uuid: string
}

export interface ArticlePage extends Page {
    title: string,
    description: string,
    image?: Image,
    link: string,

    leadAsset?: any[],
    leadImage?: Image,
    leadGallery?: any,
    gallerySlides?: any[],
    legacyId: string,
    publicationDate: Date,
    updatedDate: Date | null,
    showAsFeature: boolean,
    sponsoredContent: boolean,
    tags: Tag[],
    url: string,
    uuid: string,
    section: Tag,

    listingTitle: string,
    listingDescription: string,
    listingImage: Image,

    socialTitle: string,
    socialDescription: string,
    socialImage: Image,
}