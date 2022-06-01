import { StreamfieldBlock } from "./StreamfieldBlock";
import Tag from "./Tag";
import Image from "./Image";

export interface Page {
    id: number;
    title: string;
    uuid: string;
}

export interface ArticlePage extends Page {
    title: string;
    description: string;
    image?: Image;
    link: string;

    leadAsset?: any[];
    leadImage?: Image;
    leadGallery?: any;
    gallerySlides?: any[];
    legacyId: string;
    publicationDate: Date;
    updatedDate: Date | null;
    showAsFeature: boolean;
    sponsoredContent: boolean;
    tags: Tag[];
    url: string;
    uuid: string;
    section: Tag;
    body?: StreamfieldBlock[];

    listingTitle: string;
    listingDescription: string;
    listingImage: Image;

    socialTitle: string;
    socialDescription: string;
    socialImage: Image;
}

export interface TagPage extends Page {
    headerImage: Image;
    topPageZone: StreamfieldBlock[];
    midPageZone: StreamfieldBlock[];
}
