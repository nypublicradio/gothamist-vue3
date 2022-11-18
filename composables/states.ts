import Navigation from "./types/Navigation"

export const useSensitiveContent = () => useState<boolean>('sensitiveContent', () => false)
export const useSidebarIsOpen = () => useState<boolean>('sidebarIsOpen', () => false)
export const useSidebarOpenedFrom = () => useState<HTMLElement>('sidebarOpenedFrom', () => null)
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


// audio player globals
const currentEpisodeObj = null
/**
 * Global state for the current episode object. 
 */
export const useCurrentEpisode = () => useState('useCurrentEpisode', () => currentEpisodeObj)

const currentEpisodeHolderObj = null
/**
 * Global state for the current episode object. 
 */
export const useCurrentEpisodeHolder = () => useState('useCurrentEpisodeHolder', () => currentEpisodeHolderObj)

const allCurrentEpisodesObj = null
/**
 * Global state for ALL the current episodes object. 
 */
export const useAllCurrentEpisodes = () => useState('useAllCurrentEpisodes', () => allCurrentEpisodesObj)

const isEpisodePlaying = false
/**
 * Global state for the current Howler sound playing.
 */
export const useIsEpisodePlaying = () => useState('useIsEpisodePlaying', () => isEpisodePlaying)

const isPlayerMinimized = false
/**
 * Global state for the audio player minimize.
 */
export const useIsPlayerMinimized = () => useState('useIsPlayerMinimized', () => isPlayerMinimized)

const togglePlayTrigger = false
/**
 * Global state for the current play toggle for player play-toggle prop.
 */
export const useTogglePlayTrigger = () => useState('useTogglePlayTrigger', () => togglePlayTrigger)

/**
 * Global var for the height of the audio player
 */
export const audioPlayerHeight = 100

/**
 * Global var for the height of the header AD
 */
const currentHeaderAdHeight = 90
/**
 * Global state for the current AD height. 
 */
export const useCurrentHeaderAdHeight = () => useState('useCurrentHeaderAdHeight', () => currentHeaderAdHeight)

const isArticleHeader = false
/**
 * Global state for the current AD height. 
 */
export const useIsArticleHeader = () => useState('useIsArticleHeader', () => isArticleHeader)


// CMS preview globals
const previewData = null
/**
 * Global state for the current episode object. 
 */
export const usePreviewData = () => useState('usePreviewData', () => previewData)