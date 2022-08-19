<script setup>
import { ref } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const { $analytics } = useNuxtApp()
const tags = ref(props.article.tags)
const isSponsored = ref(props.article?.sponsoredContent || false)
const isDisableComments = ref(props.article?.disableComments || false)
const profileData = isSponsored.value
  ? props.article?.sponsors
  : props.article.authors

// function attached to the emit of the article-tags when clicked
const onTagClicked = (tag) => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking',
    component: 'Article Tags',
    event_label: tag.name,
  })
}
</script>

<template>
  <div class="article-footer">
    <!-- tags -->
    <article-tags :tags="tags" @tag-clicked="onTagClicked" />
    <!-- profile & comments-->
    <hr class="black mb-4 md:mb-6" />
    <div class="grid gutter-x-30">
      <div class="profile-col">
        <author-profile
          v-for="profile in profileData"
          :key="profile.id"
          :profileData="profile"
          :sponsored="isSponsored"
          class="mb-4 md:mb-6"
        />
        <div class="block mx-auto block lg:hidden mb-6" style="width: 300px">
          <!-- <div class="htlad-index_rectangle_1" /> -->
          <img
            src="https://fakeimg.pl/300x250/?text=AD Here"
            style="width: 100%; max-width: 300px"
            width="300"
            height="250"
            alt="advertisement"
          />
          <p class="type-fineprint">
            Gothamist is funded by sponsors and member donations
          </p>
        </div>
        <div v-if="!isDisableComments" id="comments" class="mb-4 md:mb-6">
          <hr class="black mb-4 md:mb-6" />
          <div>Comments section here</div>
          <comments-section :article="props.article" />
        </div>
      </div>
      <div class="col-fixed mx-auto hidden lg:block">
        <!-- <div class="htlad-index_rectangle_1" /> -->
        <img
          src="https://fakeimg.pl/300x250/?text=AD Here"
          style="width: 100%; max-width: 300px"
          width="300"
          height="250"
          alt="advertisement"
        />
        <p class="type-fineprint">
          Gothamist is funded by sponsors and member donations
        </p>
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
