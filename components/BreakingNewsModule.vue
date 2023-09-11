<script setup lang="ts">
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue';
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

defineProps<{
  title: string
  tag: string
  link: string
}>()

</script>
<template>
  <div class="breaking-news">
    <v-tag
      class="breaking-news-tag"
      :name="tag"
    />
    <div class="breaking-news-title"><VFlexibleLink class="breaking-news-link" :to=link>{{ title }}</VFlexibleLink></div>
  </div>
</template>
<style lang="scss">
.breaking-news {
  display: flex;
  padding: 12px 24px 12px 12px;
  background: var(--white);
  width: 100%;
  margin: 0;
  flex-direction: column;
  @include media('>=lg') {
    padding: 8px 188px 8px 12px;
    flex-direction: row;
  }
}
.breaking-news .breaking-news-tag {
  padding-bottom: 4px;
  @include media('>=lg') {
    padding-bottom: 0;
    display: block;
    flex: 0 0 174px;
  }
}
.breaking-news .breaking-news-title {
  @include media('>=lg') {
    margin: auto;
  }
}
.breaking-news .breaking-news-link {
  color: var(--link-color);
  font-family: var(--font-family-header);
  text-decoration: none;
  font-size: var(--font-size-6);
  font-weight: 600;

  &:hover, &:focus {
    color: var(--link-hover-color);
    text-decoration: var(--link-hover-text-decoration);
    font-weight: 600;
  }
}
</style>