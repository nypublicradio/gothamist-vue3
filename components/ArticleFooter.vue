<script setup>
const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const { $analytics } = useNuxtApp()
const tags = ref(props.article.tags)
const isSponsored = ref(props.article?.sponsoredContent ?? false)
const isDisableComments = ref(props.article?.disableComments ?? false)
const profileData = isSponsored.value
  ? props.article?.sponsors
  : props.article.authors

// function attached to the emit of the article-tags when clicked
function onTagClick(tag) {
  if (tag) {
    $analytics.scheduleEvent('click_tracking', {
      event_category: 'Click Tracking',
      component: 'Article Tags',
      event_label: tag.name,
    })
  }
}
</script>

<template>
  <div class="article-footer">
    <!-- tags -->
    <article-tags v-if="tags.length" :tags="tags" @tag-click="onTagClick" />
    <!-- profile & comments -->
    <hr class="black mb-4 md:mb-6">
    <div class="grid gutter-x-30">
      <div class="profile-col">
        <author-profile
          v-for="profile in profileData"
          :key="profile.id"
          :profile-data="profile"
          :sponsored="isSponsored"
          class="mb-4 md:mb-6"
        />
        <div class="block mx-auto block lg:hidden mb-6" style="width: 300px">
          <HtlAd
            slot-name="htlad-gothamist_interior_rectangle_article_bio"
            layout="rectangle"
            fineprint="Gothamist is funded by sponsors and member donations"
          />
        </div>
        <div v-if="!isDisableComments" id="comments" class="mb-4 md:mb-6">
          <hr class="black mb-4 md:mb-6">
          <comments-section :article="props.article" />
        </div>
      </div>
      <div class="col-fixed mx-auto hidden lg:block">
        <HtlAd
          slot-name="htlad-gothamist_interior_rectangle_article_bio"
          layout="rectangle"
          fineprint="Gothamist is funded by sponsors and member donations"
        />
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
    @include media('>lg') {
      max-width: 730px;
    }
  }
}
</style>
