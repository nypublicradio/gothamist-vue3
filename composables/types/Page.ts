import { StreamfieldBlock } from './StreamfieldBlock';
import Author from './Author';
import ContributingOrganization from './ContributingOrganization';
import Image from './Image';
import Slide from './Slide';
import Sponsor from './Sponsor';
import Tag from './Tag';
import NavigationLink from './NavigationLink'


export interface Page {
    id: number;
    title: string;
    uuid: string;
    type: string;

    listingTitle: string;
    listingDescription: string;
    listingImage: Image;

    preventSearchIndexing: boolean;

    socialTitle: string;
    socialDescription: string;
    socialImage: Image;

    seoTitle?: string;
    searchDescription?: string;
}

export interface ArticlePage extends Page {
    description: string;
    image?: Image;
    link: string;
    leadImageCaption?: string;
    imageLink?: string;

    leadAsset?: any[];
    leadImage?: Image;
    leadGallery?: any;
    gallerySlides?: any[];
    legacyId: string;
    publicationDate: Date;
    updatedDate: Date | null;
    showAsFeature: boolean;
    sensitiveContent: boolean;
    provocativeContent: boolean;
    sponsoredContent: boolean;
    relatedLinks: NavigationLink[];
    tags: Tag[];
    url: string;
    uuid: string;
    section: Tag;
    body?: StreamfieldBlock[];

    authors?: Author[],
    relatedAuthors?: Author[],
    contributingOrganizations: ContributingOrganization[],
    sponsors: Sponsor[],

    disableComments?: string;
    commentId: string;
}

export interface InformationPage extends Page {
    body: StreamfieldBlock[];
}

export interface StaffPage extends Page {
    headerImage: Image;
    topPageZone: StreamfieldBlock[];
    midPageZone: StreamfieldBlock[];
}

export interface TagPage extends Page {
    headerImage: Image;
    topPageZone: StreamfieldBlock[];
    midPageZone: StreamfieldBlock[];
}

export interface GalleryPage extends Page {
    description: string;
    url: string;

    slides: Slide[]

    authors: Author[],
    contributingOrganizations: ContributingOrganization[],
    relatedArticles: ArticlePage[]
    articleTitle: string,
    articleLink: string,

    listingImage: Image;
    socialImage: Image;
}
