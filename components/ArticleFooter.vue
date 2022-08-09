<script setup>
import { ref } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const tags = ref(props.article.tags)
const isSponsored = ref(props.article?.sponsoredContent || false)
const isDisableComments = ref(props.article?.disableComments || false)
const profileData = isSponsored.value
  ? props.article?.sponsors
  : props.article.authors

// function attached to the emit of the article-tags when clicked
const onTagClicked = (tag) => {
  sendEvent('click_tracking', {
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
        <div v-if="!isDisableComments" id="comments" class="mb-4 md:mb-6">
          <hr class="black mb-4 md:mb-6" />
          <div>Comments section here</div>
        </div>
      </div>
      <div class="col-fixed mx-auto">
        <!-- <div class="htlad-index_rectangle_1" /> -->
        <img
          src="https://fakeimg.pl/300x250/?text=AD Here"
          style="width: 100%; max-width: 300px"
        />
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
