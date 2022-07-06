<script setup>
//import { ref, computed, onMounted, defineEmits } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>

<template>
  <div class="menu-list">
    <v-flexible-link to="https://sponsorship.wnyc.org/">
      Advertising
    </v-flexible-link>
    <v-flexible-link to="https://www.nypublicradio.org/support/">
      Support us
    </v-flexible-link>
    <v-flexible-link to="/contact"> Contact us </v-flexible-link>
    <v-flexible-link to="/feed"> RSS feed </v-flexible-link>
    <v-flexible-link to="https://www.nypublicradio.org/diversity-dei-overview/">
      Diversity (DEI)
    </v-flexible-link>
  </div>
</template>

<style lang="scss" scoped>
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @include media('<lg') {
    gap: 1rem;
  }
  .flexible-link {
    text-transform: uppercase;
    text-decoration: none;
    color: var(--white);
    @include font-config($type-label2);
  }
}
</style>
