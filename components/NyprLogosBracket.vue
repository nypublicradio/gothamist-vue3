<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>

<template>
  <div class="nypr-logos-bracket flex">
    <logo-nypr />
    <div class="bracket bracket-left" />
    <v-flexible-link to="https://www.wnyc.org/" target="_blank">
      <logo-wnyc />
    </v-flexible-link>
    <v-flexible-link to="https://www.wnyc.org/" target="_blank">
      <logo-gothamist />
    </v-flexible-link>
    <v-flexible-link to="https://www.wnycstudios.org/" target="_blank">
      <logo-wnyc-studios />
    </v-flexible-link>
    <v-flexible-link
      to="https://www.wnyc.org/series/new-jersey-public-radio/"
      target="_blank"
    >
      <logo-njpr />
    </v-flexible-link>
    <v-flexible-link to="https://www.wqxr.org/" target="_blank">
      <logo-wqxr />
    </v-flexible-link>
    <v-flexible-link to="https://www.newsounds.org/" target="_blank">
      <logo-new-sounds />
    </v-flexible-link>
    <div class="inline-flex">
      <v-flexible-link to="https://www.thegreenespace.org/" target="_blank">
        <logo-the-greene-space />
      </v-flexible-link>
      <div class="bracket bracket-right ml-3" />
    </div>
  </div>
</template>

<style lang="scss">
.nypr-logos-bracket {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  @include media('<xl') {
    gap: 1rem 0.75rem;
  }
  @include media('<lg') {
    gap: 1rem 1rem;
  }
  @include media('<sm') {
    gap: 1rem 0.65rem;
  }
  svg {
    &.gothamist-logo {
      width: auto;
      height: 16px;
    }
    &.njpr-logo {
      width: auto;
      height: 18px;
    }
    path {
      fill: var(--white);
    }
  }
  .bracket {
    height: 32px;
    width: 8px;
    border: 1px solid var(--black300);
    &.bracket-left {
      border-right: none;
    }
    &.bracket-right {
      border-left: none;
    }
  }
}
</style>
