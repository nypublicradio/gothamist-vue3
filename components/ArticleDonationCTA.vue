<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'We rely on your support to make local news available to all',
  },
  donateUrlBase: {
    type: String,
    required: true,
  },
  utmCampaign: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['donate-click'])

const config = useRuntimeConfig()

const donateUrl = ref(
  `${props.donateUrlBase || config.public.donateUrlBase}&utm_campaign=${
    props.utmCampaign
  }`,
)

const getCurrentYear = () => new Date().getFullYear()
</script>

<template>
  <div class="article-donation-CTA">
    <div class="h6">
      {{ title }}
    </div>
    <p class="type-textlink2 no-underline">
      Make your contribution now and help Gothamist thrive in
      {{ getCurrentYear() }}.
      <VFlexibleLink
        :to="donateUrl"
        class="author-name"
        @click="emit('donate-click', donateUrl)"
      >
        Donate today
      </VFlexibleLink>
    </p>
  </div>
</template>

<style lang="scss">
.article-donation-CTA {
  background-color: var(--soybean200);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 2.5rem;
  p {
    color: var(--black100);
    margin-top: 2px;
  }
}
</style>
