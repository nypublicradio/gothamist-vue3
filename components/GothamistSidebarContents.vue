<script setup lang="ts">
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import Navigation from '~~/composables/types/Navigation.js';
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue';

const props = defineProps<{
    navigation: Navigation
    donateUrl: string
}>()
</script>

<template>
    <div class="sidebar-contents pt-3">
        <div class="sidebar-contents-top pb-5">
            <menu-list :navLinks="props.navigation.primaryNavigation" />
        </div>
        <div class="sidebar-contents-bottom mb-5 md:mb-6">
            <v-flexible-link to="mailto:tips@gothamist.com" raw>
                <Button class="sidebar-button-send-a-story p-button-rounded mb-5 w-full">
                    <span class="p-button-label">Send a story idea</span>
                </Button>
            </v-flexible-link>
            <hr class="white mb-3" />
            <v-share-tools class="mb-3">
                <span>Follow Us</span>
                <v-share-tools-item service="facebook" username="gothamist" />
                <v-share-tools-item service="twitter" username="gothamist" />
                <v-share-tools-item service="instagram" username="gothamist" />
                <v-share-tools-item
                    service="youtube"
                    username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
                />
            </v-share-tools>
            <hr class="white mb-3" />
            <div class="flex mb-3">
                <div class="mr-2">Replace this message with a thing about being non profit, member funded local news.</div>
                <div><LogoNypr /></div>
            </div>
            <v-flexible-link :to="donateUrl" raw>
                <Button class="p-button-rounded w-full">
                    <span class="p-button-label">
                        <span class="pi pi-heart-fill"></span>
                        Support us today
                    </span>
                </Button>
            </v-flexible-link>
        </div>
    </div>
</template>

<style lang="scss">
.sidebar-contents {
    min-height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: var(--text-color);
}

.sidebar-contents .menu-list {
    gap: 1.5rem;
}

.sidebar-contents .menu-list a.flexible-link {
    font-family: var(--font-family-header);
    text-transform: none;
    font-weight: 600;
    font-size: 26px;
    @include media('>sm') {
        font-size: 32px;
    }
}

.sidebar-button-send-a-story.p-button {
    background: var(--black-300);
    color: var(--text-color);
}
</style>