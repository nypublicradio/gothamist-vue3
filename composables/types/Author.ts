import ContributingOrganization from "./ContributingOrganization";

export default interface Author {
    id: number;
    name: string;
    contributingOrganization?: ContributingOrganization;
    photoID: number;
    jobTitle: string;
    biography: string;
    website?:string;
    email?: string;
    slug: string;
}
