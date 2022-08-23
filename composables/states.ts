import Navigation from "./types/Navigation"

export const useSensitiveContent = () => useState<boolean>('sensitiveContent', () => false)
export const useSidebarIsOpen = () => useState<boolean>('sidebarIsOpen', () => false)
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
