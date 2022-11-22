import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        if (document.location.hash) {
            window.setTimeout(() => {
                const scrollTarget =  document.querySelector(document.location.hash)
                if (scrollTarget) {
                    scrollTarget.scrollIntoView()
                    return
                }
            }, 300)
        }
        window.scrollTo(0, 0)
    })
})