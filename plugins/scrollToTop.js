import { defineNuxtPlugin } from '#app'
// this will always bring the user to the top of the page. Nuxt3 will hopfully have a better solution soon for this where we can use saved positions when going back etc...
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        if (!document.location.hash) {
            window.scrollTo(0, 0)
        }
    })
})