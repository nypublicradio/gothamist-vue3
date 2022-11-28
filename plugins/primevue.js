import { defineNuxtPlugin } from '#app'
import Button from 'primevue/button/button.esm.js'
import Checkbox from 'primevue/checkbox/checkbox.esm.js'
import Divider from 'primevue/divider/divider.esm.js'
import Dialog from 'primevue/dialog/dialog.esm.js'
import InputText from 'primevue/inputtext/inputtext.esm.js'
import Menu from 'primevue/menu/menu.esm.js'
import Menubar from 'primevue/menubar/menubar.esm.js'
import MegaMenu from 'primevue/megamenu/megamenu.esm.js'
import Paginator from 'primevue/paginator/paginator.esm.js'
import PrimeVue from 'primevue/config/config.esm.js'
import Sidebar from 'primevue/sidebar/sidebar.esm.js'
import TieredMenu from 'primevue/tieredmenu/tieredmenu.esm.js'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.component('Dialog', Dialog)
    nuxtApp.vueApp.component('Divider', Divider)
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Checkbox', Checkbox)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Menubar', Menubar)
    nuxtApp.vueApp.component('Menu', Menu)
    nuxtApp.vueApp.component('MegaMenu', MegaMenu)
    nuxtApp.vueApp.component('Sidebar', Sidebar)
    nuxtApp.vueApp.component('Paginator', Paginator)
    nuxtApp.vueApp.component('TieredMenu', TieredMenu)
    //other components that you need
})