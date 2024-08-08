<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

defineProps<{
  title: string
  calloutText: string
  link: string
}>()
</script>

<template>
  <div class="breaking-news">
    <VFlexibleLink class="breaking-news-link" raw :to="link">
      <span class="breaking-news-callout">
        {{ calloutText }}
      </span>
      <span class="breaking-news-title">
        {{ title }}
      </span>
    </VFlexibleLink>
  </div>
</template>

<style lang="scss">
.breaking-news {
  display: flex;
  width: 100%;
  margin: 0;
  flex-direction: row;
}

.breaking-news a.breaking-news-link {
  display: flex;
  margin: 0;
  flex-direction: row;
  text-decoration: none;
  font-family: var(--font-family-header);
  line-height: 20px;
  cursor: pointer;

  .breaking-news-callout {
    color: red;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 8px;
    font-size: var(--font-size-6);
    text-decoration: none;
    white-space: nowrap;
    font-weight: 600;
  }
  .breaking-news-title  {
    color: var(--link-hover-color);
    font-size: var(--font-size-5);
    text-decoration: none;
    text-align: top;
    font-weight: 600;
  }

  &:hover, &:focus {
    text-decoration: none;
    .breaking-news-callout {
      color: red;
      text-decoration: none;
    }
    .breaking-news-title  {
      color: var(--link-hover-color);
      text-decoration: var(--link-hover-text-decoration);
      text-underline-offset: 4px;
    }
  }
}
</style>
