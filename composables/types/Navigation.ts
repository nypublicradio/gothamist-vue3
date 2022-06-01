import NavigationLink from "./NavigationLink";

export default interface Navigation {
    id: number;
    primaryNavigation: NavigationLink[];
    secondaryNavigation: NavigationLink[];
    primaryFooterLinks: NavigationLink[];
    secondaryFooterLinks: NavigationLink[];
    legalLinks: NavigationLink[];
    copyrightYear: string;
    propertyDescription: string;
}
