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
    <div v-if="tags" class="tags flex gap-1 align-items-center pb-6">
      <p class="type-caption mr-3">Tagged</p>
      <v-tag
        v-for="tag in tags"
        :name="tag.name"
        :slug="tag.slug"
        :key="tag.name"
      />
    </div>
    <!-- profile & comments-->
    <hr class="black mb-6" />
    <div class="grid">
      <div class="profile-col">
        <article-footer-profile
          v-for="profile in profileData"
          :profileData="profile"
          :sponsored="isSponsored"
          class="mb-6"
        />
        <div id="comments" class="pr-0 lg:pr-3 mb-6">
          <hr class="black mb-6" />
          <div>Comments section here</div>
        </div>
      </div>
      <div class="col-fixed mx-auto">
        <!-- <div class="htlad-index_rectangle_1" /> -->
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
