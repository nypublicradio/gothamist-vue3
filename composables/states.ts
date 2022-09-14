import Navigation from "./types/Navigation"

export const useSensitiveContent = () => useState<boolean>('sensitiveContent', () => false)
export const useSidebarIsOpen = () => useState<boolean>('sidebarIsOpen', () => false)
export const useSidebarOpenedFrom = () => useState<any>('sidebarOpenedFrom', () => {})
export const useMembershipStatus = () => useState<string>('membershipStatus', () => 'status-unknown')
export const useNavigation = () => useState<Navigation>('navigation', () => ({
    id: 0,
    primaryNavigation: [],
    secondaryNavigation: [],
    primaryFooterLinks: [],
    secondaryFooterLinks: [],
    legalLinks: [],
    copyrightYear: '',
    propertyDescription: ''
}))
export const useStrapline = () => useState<string>('strapline', () => 'A non-profit newsroom, powered by WNYC.')


