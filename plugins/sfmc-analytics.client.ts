export default defineNuxtPlugin((nuxtApp) => {
    const { $gtm, $cookies } = nuxtApp;

    const memberStatusCookie = '_gothamistNyprMember'
    const maxAge = 60 * 60 * 24 * 30 * 6 // about 6 months
    const membershipStatus = useMembershipStatus()
    

    // Set the cookie and data layer status for an active member
    const setActiveMember = function () {
      $cookies.set(memberStatusCookie, 'True', { path: '/', maxAge })
      membershipStatus.value = 'active-member'
    }
  
    // Set the cookie and data layer status for an inactive member
    const setInactiveMember = function () {
      $cookies.set(memberStatusCookie, 'False', { path: '/', maxAge })
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
  
    switch ($cookies.get(memberStatusCookie)) {
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

