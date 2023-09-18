import { defineNuxtPlugin } from '#app'
import Button from 'primevue/button/button.esm.js'
import Checkbox from 'primevue/checkbox/checkbox.esm.js'
import InputText from 'primevue/inputtext/inputtext.esm.js'
import PrimeVue from 'primevue/config/config.esm.js'
import Sidebar from 'primevue/sidebar/sidebar.esm.js'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Checkbox', Checkbox)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Sidebar', Sidebar)
    //other components that you need
})