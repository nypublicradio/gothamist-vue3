<script setup lang="ts">
import { ArticlePage } from '~~/composables/types/Page';
import { computed } from 'vue';
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
const props = withDefaults(defineProps<{ 
    article: ArticlePage
    class: string
    width?: number
    height?: number
    ratio?: number[]
    sizes?: number[]
    quality?: number
    hideImage?: boolean
    hideTags?: boolean
    loading?: 'eager' | 'lazy'
}>(), {
    width: null,
    height: null,
    ratio: () => [3, 2],
    sizes: () => [1],
    hideImage: false,
    hideTags: false,
    quality: 80,
    loading: 'lazy'
})

const tags = computed(() => {
    if (props.hideTags || props.article.sponsoredContent) {
        return []
    }
    return [
        {
            name: props.article.section.name,
            slug: `/${props.article.section.slug}`
        }
    ]
})
</script>

<template>
    <v-card
        class="gothamist-card"
        :class="props.class"
        :image="hideImage ? null : useImageUrl(article.listingImage)"
        :title="article.listingTitle"
        :titleLink="article.link"
        :maxWidth="article.listingImage?.width"
        :maxHeight="article.listingImage?.height"
        :sponsored="article.sponsoredContent"
        :ratio="ratio"
        :width="width"
        :height="height"
        :sizes="sizes"
        :quality="80"
        :tags="tags"
        :loading="loading"
        v-bind="{ ...$props, ...$attrs }"
    >
        <slot />
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