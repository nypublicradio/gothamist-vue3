import { StreamfieldBlock } from './StreamfieldBlock';
import Author from './Author';
import ContributingOrganization from './ContributingOrganization';
import Image from './Image';
import Slide from './Slide';
import Sponsor from './Sponsor';
import Tag from './Tag';

export interface Page {
    id: number;
    title: string;
    uuid: string;
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
    gallery?: any[];
    legacyId: string;
    publicationDate: Date;
    updatedDate: Date | null;
    showAsFeature: boolean;
    sensitiveContent: boolean;
    provocativeContent: boolean;
    sponsoredContent: boolean;
    tags: Tag[];
    url: string;
    uuid: string;
    section: Tag;
    body?: StreamfieldBlock[];

    authors?: Author[],
    relatedAuthors?: Author[],
    contributingOrganizations: ContributingOrganization[],
    sponsors: Sponsor[],

    listingTitle: string;
    listingDescription: string;
    listingImage: Image;

    socialTitle: string;
    socialDescription: string;
    socialImage: Image;

    seoTitle?: string;
    searchDescription?: string;

    disableComments?: string;

}

export interface InformationPage extends Page {
    body: any[];
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

    listingTitle: string;
    listingDescription: string;
    listingImage: Image;

    socialTitle: string;
    socialDescription: string;
    socialImage: Image;

    seoTitle: string;
    searchDescription: string;
}
