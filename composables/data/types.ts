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

export interface StreamfieldBlock {
    id: string,
    type: string,
    value: string,
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
    body?: StreamfieldBlock,

    listingTitle: string,
    listingDescription: string,
    listingImage: Image,

    socialTitle: string,
    socialDescription: string,
    socialImage: Image,
}

export interface TagPage extends Page {
    headerImage: Image,
    topPageZone: StreamfieldBlock[],
    midPageZone: StreamfieldBlock[]
}

export interface CMSLink {
    id: string,
    type: "cms_page",
    value: {
        page: number,
        title: string,
        url: string,
        slug: string
    }
}

export interface ExternalLink {
    id: string,
    type: "external_link",
    value: {
        url: string,
        title: string,
    }
}

type NavigationLink = CMSLink | ExternalLink

export interface Navigation {
    id: number,
    primaryNavigation: NavigationLink[],
    secondaryNavigation: NavigationLink[],
    primaryFooterLinks: NavigationLink[],
    secondaryFooterLinks:  NavigationLink[],
    legalLinks: NavigationLink[],
    copyrightYear: 'string'
    propertyDescription: 'string'
}

export interface ProductBanner {
    title: string,
    description: string,
    buttonText: string,
    buttonLink: string,
    frequencyInHours: number,
    location: 'TOP' | 'BOTTOM'
}

export interface BreakingNews {
    title: string,
    link: string,
    description: string
}