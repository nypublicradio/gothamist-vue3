<script setup>
import { useRuntimeConfig } from '#app'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const config = useRuntimeConfig()

const props = defineProps({
  utmCampaign: {
    type: String,
    default: 'article-top',
  },
})

const donateUrl = ref(
  `${config.donateUrlBase}&utm_campaign=${props.utmCampaign}`
)

const emit = defineEmits(['donate-click'])
</script>

<template>
  <div class="article-donation-CTA">
    <h6>We rely on your support to make local news available to all</h6>
    <p class="type-textlink2 no-underline">
      Make your contribution now and help Gothamist thrive in 2022.
      <v-flexible-link
        :to="donateUrl"
        @click="emit('donate-click', donateUrl)"
        class="author-name"
      >
        Donate today
      </v-flexible-link>
    </p>
  </div>
</template>

<style lang="scss">
.article-donation-CTA {
  background-color: var(--soybean200);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 2.5rem;
}
</style>
