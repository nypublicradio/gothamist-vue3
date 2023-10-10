<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>

<template>
  <div class="boroughs p-4 xl:p-6 pb-6 xl:pb-8" data-style-mode="dark">
    <div class="boroughs-header mb-5 xl:mb-7 py-2">
      WNYC Presents
    </div>
    <div class="boroughs-content">
      We cover stories that make New York work for New Yorkers. Browse
      <VFlexibleLink to="/tags/manhattan" raw raw-hover="underline">
        <div class="tag-large">
          Manhattan
        </div>
      </VFlexibleLink>
      <VFlexibleLink to="/tags/brooklyn" raw raw-hover="underline">
        <div class="tag-large">
          Brooklyn
        </div>
      </VFlexibleLink>
      <VFlexibleLink to="/tags/the-bronx" raw raw-hover="underline">
        <div class="tag-large">
          The Bronx
        </div>
      </VFlexibleLink>
      <VFlexibleLink to="/tags/staten-island" raw raw-hover="underline">
        <div class="tag-large">
          Staten Island
        </div>
      </VFlexibleLink>
      <VFlexibleLink to="/tags/queens" raw raw-hover="underline">
        <div class="tag-large">
          Queens
        </div>
      </VFlexibleLink>
      <VFlexibleLink to="/tags/new-jersey" raw raw-hover="underline">
        <div class="tag-large">
          New Jersey
        </div>
      </VFlexibleLink>
    </div>
    <div class="boroughs-footer mt-4 xl:mt-5">
      ♥
      <VFlexibleLink
        to="https://pledge.wnyc.org/support/gothamist/?utm_medium=partnersite&utm_source=gothamist&utm_campaign=homepage-brand-moment"
        target="_blank"
      >
        Support our local coverage
      </VFlexibleLink>
    </div>
  </div>
</template>

<style lang="scss">
.boroughs {
  width: 100%;
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
.boroughs .tag-large {
  margin: 0.25rem 0.15rem 0.25rem 0.25rem;
  text-decoration: none;
  display: inline-block;
  width: fit-content;
  font-weight: 600;
  @include media('>lg') {
    margin: 0 0.25rem 0.5rem;
    display: inline-block;
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
.boroughs .boroughs-content {
  width: 1150px;
  max-width: 100%;
  margin: auto;
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
