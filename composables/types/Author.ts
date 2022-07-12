import ContributingOrganization from "./ContributingOrganization";

export default interface Author {
    id?: number;
    firstName: string;
    lastName: string;
    organization?: string;
    organizationUrl?: string;
    url?: string;
    name?: string;
    contributingOrganization?: ContributingOrganization;
    photoID?: number;
    jobTitle?: string;
    biography?: string;
    website?:string;
    email?: string;
    slug?: string;
}
