<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import { useCommentCounts } from '~~/composables/comments'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
  showSocial: {
    type: Boolean,
    default: true,
  },
  showComments: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<(e: 'link-click', value: any) => void>()

const { $analytics } = useNuxtApp()

const authors = ref(props.article?.authors)
const shareUrl = ref(props.article?.url)
const shareTitle = ref(props.article?.title)
const isMultipleAuthors = ref(props.article?.authors.length > 1)
const isDisableComments = ref(props.article?.disableComments ?? false)
const isSponsored = ref(props.article?.sponsoredContent ?? false)
const sponsor = ref(props.article?.sponsors ? props.article?.sponsors[0] : null)
const commentCounts = ref(useCommentCounts())
const commentCount = computed(() => {
  return commentCounts.value[props.article?.commentId]
})
</script>

<template>
  <div class="byline">
    <!-- sponsored -->
    <div v-if="isSponsored" class="sponsored flex align-items-center">
      <div class="author-image flex-none">
        <VFlexibleLink :to="sponsor?.link" raw>
          <VSimpleResponsiveImage
            v-if="sponsor?.logo"
            :src="useImageUrl({ id: sponsor?.logo })"
            :width="60"
            :height="60"
            :sizes="[2]"
            :ratio="[1, 1]"
            alt="Sponsor's image"
          />
          <img v-else src="/avatar.svg" alt="Sponsor's image" loading="lazy">
        </VFlexibleLink>
      </div>
      <div class="flex flex-column gap-125">
        <p class="type-caption">
          Article sponsored by
        </p>
        <VFlexibleLink :to="sponsor?.link" class="author-name">
          {{ sponsor?.name }}
        </VFlexibleLink>
        <date-published :article="article" />
        <VFlexibleLink
          v-if="!isDisableComments && showComments && commentCount"
          to="#comments"
          class="type-textlink2"
        >
          {{ String(Number(commentCount)) }}
          {{ commentCount === 1 ? 'comment' : 'comments' }}
        </VFlexibleLink>
      </div>
    </div>
    <!-- authors -->
    <div
      v-else
      class="author flex"
      :class="isMultipleAuthors ? 'multiple-authors' : 'one-author'"
    >
      <div class="author-images flex flex-wrap">
        <div v-for="author of authors" :key="author.id" class="author-image">
          <VFlexibleLink
            :to="author.url"
            raw
            aria-hidden="true"
            tabindex="-1"
          >
            <VSimpleResponsiveImage
              v-if="author.photoID"
              :src="useImageUrl({ id: author.photoID })"
              :width="60"
              :height="60"
              :sizes="[2]"
              :ratio="[1, 1]"
              alt=""
            />
            <img v-else src="/avatar.svg" alt="" loading="lazy">
          </VFlexibleLink>
        </div>
      </div>
      <div class="flex flex-column gap-125">
        <VByline
          :authors="authors"
          prefix="By"
          @name-click="$event => emit('link-click', $event?.url)"
          @organization-click="$event => emit('link-click', $event?.url)"
        />
        <date-published :article="article" />
        <VFlexibleLink
          v-if="!isDisableComments && showComments && commentCount"
          to="#comments"
          class="type-textlink2"
        >
          {{ String(Number(commentCount)) }}
          {{ commentCount === 1 ? 'comment' : 'comments' }}
        </VFlexibleLink>
      </div>
    </div>
    <!-- social share -->
    <div v-if="showSocial">
      <hr class="mt-4">
      <VShareTools label="Share" class="mt-3">
        <VShareToolsItem
          action="share"
          service="facebook"
          :url="shareUrl"
          :utm-parameters="{
            medium: 'social',
            source: 'facebook',
            campaign: 'shared_facebook',
          }"
          @share="
            $analytics.scheduleEvent('click_tracking', {
              event_category: 'Click Tracking',
              component: 'Article Byline',
              event_label: 'Social Share Facebook',
            })
          "
        />

        <VShareToolsItem
          action="share"
          service="twitter"
          :url="shareUrl"
          :share-parameters="{ text: shareTitle, via: 'gothamist' }"
          :utm-parameters="{
            medium: 'social',
            source: 'twitter',
            campaign: 'shared_twitter',
          }"
          @share="
            $analytics.scheduleEvent('click_tracking', {
              event_category: 'Click Tracking',
              component: 'Article Byline',
              event_label: 'Social Share Twitter',
            })
          "
        />
        <VShareToolsItem
          action="share"
          service="reddit"
          :url="shareUrl"
          :share-parameters="{ title: shareTitle }"
          :utm-parameters="{
            medium: 'social',
            source: 'reddit',
            campaign: 'shared_reddit',
          }"
          @share="
            $analytics.scheduleEvent('click_tracking', {
              event_category: 'Click Tracking',
              component: 'Article Byline',
              event_label: 'Social Share Reddit',
            })
          "
        />
        <VShareToolsItem
          action="share"
          service="email"
          :url="shareUrl"
          :share-parameters="{ body: `${shareTitle} - %URL%` }"
          :utm-parameters="{
            medium: 'social',
            source: 'email',
            campaign: 'shared_email',
          }"
          @share="
            $analytics.scheduleEvent('click_tracking', {
              event_category: 'Click Tracking',
              component: 'Article Byline',
              event_label: 'Social Share Email',
            })
          "
        />
      </VShareTools>
    </div>
  </div>
</template>

<style lang="scss">
.byline {
  * {
    @include font-config($type-link);
  }
  .author,
  .sponsored {
    .author-image {
      background: #ffffff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 12px;
      overflow: hidden;
      img {
        width: 60px;
        height: 60px;
      }
    }
    &.multiple-authors {
      flex-direction: column;
      align-items: start;
      .author-image {
        width: 48px;
        height: 48px;
        margin-bottom: 10px;
        img {
          width: 48px;
          height: 48px;
        }
      }
    }
    &.one-author {
      align-items: center;
    }
  }
  .v-byline {
    a.v-byline-author-name {
      font-weight: var(--font-weight-500);
    }
    .v-byline-contributing-org {
      color: var(--gray-600);
    }
  }
  .date-published .type-caption,
  .sponsored .type-caption {
    @include font-config($type-caption);
  }
}
</style>
