export default defineNuxtPlugin((nuxtApp) => {
    const memberStatusCookie = '_gothamistNyprMember'
    const maxAge = 60 * 60 * 24 * 30 * 6 // about 6 months
    const membershipStatus = useMembershipStatus()
    const cookie = useCookie(memberStatusCookie, { path: '/', maxAge })

    // Set the cookie and data layer status for an active member
    const setActiveMember = function () {
      cookie.value = 'True'
      membershipStatus.value = 'active-member'
    }
  
    // Set the cookie and data layer status for an inactive member
    const setInactiveMember = function () {
      cookie.value = 'False'
      membershipStatus.value = 'inactive-member'
    }
  
    // Set the data layer status for an unknown membership status (no cookie)
    const setUnknownStatus = function () {
      membershipStatus.value = 'status-unknown'
    }
  
    if (window && window.location) {
      const url = new URL(window.location.href)
      const memberStatus = url.searchParams.get('nypr_member')
      switch (memberStatus) {
        case 'True':
          setActiveMember()
          return // if setting status from url, we don't need to check cookie
        case 'False':
          setInactiveMember()
          return // if setting status from url, we don't need to check cookie
        default:
          setUnknownStatus()
      }
    }
  
    switch (cookie.value) {
      case 'True':
        setActiveMember()
        break
      case 'False':
        setInactiveMember()
        break
      default:
        setUnknownStatus()
    }
})

