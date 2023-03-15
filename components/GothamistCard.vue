<script setup lang="ts">
import { ArticlePage, GalleryPage } from '~~/composables/types/Page';
import { computed } from 'vue';
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import Image from '~~/composables/types/Image';

type CardData = {
    listingTitle: string
    listingImage?: Image
    link: string
}

const { $analytics } = useNuxtApp()
const props = withDefaults(defineProps<{ 
    article?: ArticlePage | GalleryPage | CardData
    class: string
    width?: number
    height?: number
    ratio?: number[]
    sizes?: number[]
    quality?: number
    hideImage?: boolean
    hideTags?: boolean
    loading?: 'eager' | 'lazy'
    trackClicks?: boolean
    trackingComponent?: string
    trackingComponentLocation?: string
    trackingComponentPosition?: number
}>(), {
    article: null,
    width: null,
    height: null,
    ratio: () => [3, 2],
    sizes: () => [1],
    hideImage: false,
    hideTags: false,
    quality: 80,
    loading: 'lazy',
    trackClicks: false,
    trackingComponent: null,
    trackingComponentLocation: null,
    trackingComponentPosition: null
})


const sponsored = computed(() => "sponsoredContent" in props.article && props.article.sponsoredContent)
const link = computed(() => "link" in props.article && props.article.link || 
             "url" in props.article && props.article.url)

const tags = computed(() => {
    if (props.hideTags 
        || sponsored
        || !("section" in props.article)) {
        return []
    }
    return [
        {
            name: props.article.section.name,
            slug: `/${props.article.section.slug}`
        }
    ]
})

const trackClick = function (targetUrl: string) {
    if (props.trackClicks) {
        $analytics.sendEvent('click_tracking', {
            event_category: `Click Tracking - ${props.trackingComponentLocation}`,
            component:  props.trackingComponent,
            component_position: props.trackingComponentPosition && String(props.trackingComponentPosition),
            event_label: targetUrl
        })
    }
}
</script>

<template>
    <v-card
        v-if="article"
        class="gothamist-card"
        :class="props.class"
        :image="hideImage ? null : useImageUrl(article.listingImage)"
        :title="article.listingTitle"
        :titleLink="link"
        :maxWidth="article.listingImage?.width"
        :maxHeight="article.listingImage?.height"
        :sponsored="sponsored"
        :ratio="ratio"
        :width="width"
        :height="height"
        :sizes="sizes"
        :quality="80"
        :tags="tags"
        :loading="loading"
        v-bind="{ ...$props, ...$attrs }"
        @titleClick="trackClick(link)"
        @imageClick="trackClick(link)"
        @creditClick="trackClick(article.listingImage?.creditLink)"
        @tagClick="(tag) => trackClick(`tags/${tag?.slug}`)"
    >
        <slot :trackClick="trackClick" />
    </v-card>
</template>

<style lang="scss">
div.gothamist-card.sponsored {
    background: var(--soybean200)
}
@include media('<lg') {
    div.gothamist-card.sponsored.mod-horizontal {
        min-width: 100vw;
        padding: 0 1.5rem;
        margin-left: -1.5rem;
        & .image-with-caption {
            margin: 2rem 0;
        }
    }
}
</style>