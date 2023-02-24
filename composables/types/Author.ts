import ContributingOrganization from "./ContributingOrganization";

type SocialMediaProfile =  {
    id: number
    service: string
    profileUrl: string
}
export default interface Author {
    id?: number;
    firstName: string;
    lastName: string;
    organization?: string;
    organizationUrl?: string;
    url?: string;
    name?: string;
    contributingOrganization?: ContributingOrganization;
    socialMediaProfile?: SocialMediaProfile[];
    photoID?: number;
    jobTitle?: string;
    biography?: string;
    website?:string;
    email?: string;
    slug?: string;
}
