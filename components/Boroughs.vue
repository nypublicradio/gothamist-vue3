<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>
<template>
  <div class="boroughs p-4 xl:p-6 pb-6 xl:pb-8" data-style-mode="dark">
    <div class="boroughs-header mb-5 xl:mb-7 py-2">WNYC Presents</div>
    <div>
      We cover stories that make New York work for New Yorkers. Browse
      <v-flexible-link to="/tags/manhattan" class="tag-large">
        Manhattan
      </v-flexible-link>
      <v-flexible-link to="/tags/brooklyn" class="tag-large">
        Brooklyn
      </v-flexible-link>
      <v-flexible-link to="/tags/the-bronx" class="tag-large">
        The Bronx
      </v-flexible-link>
      <v-flexible-link to="/tags/staten-island" class="tag-large">
        Staten Island
      </v-flexible-link>
      <v-flexible-link to="/tags/queens" class="tag-large">
        Queens
      </v-flexible-link>
      <v-flexible-link to="/tags/new-jersey" class="tag-large">
        New Jersey
      </v-flexible-link>
    </div>
    <div class="boroughs-footer mt-4 xl:mt-5">
      ♥
      <v-flexible-link
        to="https://www.nypublicradio.org/support/"
        target="_blank"
      >
        Support our local coverage
      </v-flexible-link>
    </div>
  </div>
</template>

<style lang="scss">
.boroughs {
  background: var(--black);
  text-align: center;
  font-size: var(--font-size-10);
  line-height: var(--font-size-10);
  color: var(--white);
  font-family: var(--font-family-header);
  font-weight: 600;
  @include media('>lg') {
    font-size: var(--font-size-17);
    line-height: var(--font-size-17);
  }
}
.boroughs a {
  margin: 0 0.15rem 0.25rem;
  text-decoration: none;
  display: inline-block;
  @include media('>lg') {
    margin: 0 0.25rem 0.5rem;
  }
}
.boroughs .boroughs-header {
  font-size: var(--font-size-5);
  line-height: var(--font-size-5);
  font-weight: 400;
  text-transform: uppercase;
  text-align: left;
  border-top: solid 1px var(--white);
  @include media('>lg') {
    font-size: var(--font-size-6);
    line-height: var(--font-size-6);
  }
}
.boroughs .boroughs-footer {
  font-size: var(--font-size-5);
  line-height: var(--font-size-6);
  font-weight: 400;
}
.boroughs .boroughs-footer a {
  font-weight: 400;
  text-decoration: underline;
}
</style>
