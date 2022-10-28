<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const sponsorLink = 'https://bit.ly/3WpvVvp'
</script>
<template>
  <div class="sponsor-placement flex mb-3">
    <div class="sponsor-placement-logo pr-3">
      <v-flexible-link :to="sponsorLink">
        <img
          alt="GrubHub Logo"
          src="/grubhub-circle.png"
          srcset="
            /grubhub-circle.png,
            /grubhub-circle2x.png 2x,
            /grubhub-circle4x.png 4x
          "
          width="64"
          height="64"
        />
      </v-flexible-link>
    </div>
    <div class="sponsor-placement-details flex flex-column">
      <p>Sponsored by</p>
      <v-flexible-link :to="sponsorLink" class="no-underline">
        <p class="sponsor-name">Grubhub</p>
      </v-flexible-link>
      <p>a proud supporter of Gothamist</p>
    </div>
  </div>
</template>
<style lang="scss">
.sponsor-placement p {
  font-family: var(--font-family-header);
  font-size: var(--font-size-5);
  line-height: 1.5;
}
.sponsor-name {
  font-weight: bold;
}
</style>
