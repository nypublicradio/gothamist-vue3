<script setup>
import { ref } from 'vue'
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const tags = ref(props.article.tags)
const isSponsored = ref(props.article?.sponsoredContent || false)
const profileData = isSponsored.value
  ? props.article?.sponsors
  : props.article.authors
</script>

<template>
  <div class="article-footer">
    <!-- tags -->
    <div v-if="tags" class="tags flex gap-1 align-items-center py-6">
      <p class="type-caption mr-3">Tagged</p>
      <v-tag
        v-for="tag in tags"
        :name="tag.name"
        :slug="tag.slug"
        :key="tag.name"
      />
    </div>
    <hr class="black" />
    <div class="grid">
      <div class="profile-col">
        <article-footer-profile
          v-for="profile in profileData"
          :profileData="profile"
          :sponsored="isSponsored"
        />
      </div>
      <div class="col-fixed">
        <img src="https://fakeimg.pl/300x250/?text=AD Here" />
        <p class="type-fineprint">Powered by members and sponsors</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.article-footer {
  .profile-col {
    flex-grow: 1;
    flex-basis: 0;
    padding: 0.5rem;
    @include media('<lg') {
      flex: 0 0 auto;
      padding: 0.5rem;
      width: 100%;
    }
  }
}
</style>
