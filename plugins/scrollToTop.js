import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', (a,b,c) => {
        if (document.location.hash) {
            const scrollTarget =  document.querySelector(document.location.hash)
            if (scrollTarget) {
                scrollTarget.scrollIntoView()
                return
            }
        }
        window.scrollTo(0, 0)
    })
})