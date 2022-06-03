interface CMSLink {
    id: string;
    type: "cms_page";
    value: {
        page: number;
        title: string;
        url: string;
        slug: string;
    };
}
interface ExternalLink {
    id: string;
    type: "external_link";
    value: {
        url: string;
        title: string;
    };
}

type NavigationLink = CMSLink | ExternalLink
export default NavigationLink
