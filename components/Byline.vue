<script setup>
import { ref } from 'vue'

import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const authors = ref(props.article.authors)
const shareUrl = ref(props.article.url)
const shareTitle = ref(props.article.title)
const isMultipleAuthors = ref(props.article.authors.length > 1)
const isDisableComments = ref(props.article?.disableComments || false)
const comments = ref(props.article?.comments || 'Go to')
const isSponsored = ref(props.article?.sponsoredContent || false)
const sponsor = ref(props.article?.sponsors[0] || [])
</script>

<template>
  <div class="byline">
    <hr class="black" />

    <!-- sponsored -->
    <div v-if="isSponsored" class="sponsored flex align-items-center py-4">
      <div class="author-image">
        <v-flexible-link :to="sponsor.link" raw>
          <v-simple-responsive-image
            v-if="sponsor.logo"
            :src="useImageUrl({ id: sponsor.logo })"
            :width="60"
            :height="60"
            :sizes="[1, 2]"
            :ratio="[1, 1]"
            alt="Sponsor's image"
          />
          <img v-else src="/avatar.svg" alt="Sponsor's image" />
        </v-flexible-link>
      </div>
      <div>
        <p class="type-caption">Article sponsored by</p>
        <v-flexible-link :to="sponsor.link" class="author-name">
          {{ sponsor.name }}
        </v-flexible-link>
        <date-published :article="props.article" />
        <v-flexible-link
          v-if="!isDisableComments"
          to="#comments"
          class="type-textlink2"
        >
          {{ comments }} comments
        </v-flexible-link>
      </div>
    </div>
    <!-- authors -->
    <div
      v-else
      class="author flex py-4"
      :class="isMultipleAuthors ? 'multiple-authors' : 'one-author'"
    >
      <div class="author-images flex">
        <div
          v-for="author of authors"
          :key="author.photoID"
          class="author-image"
        >
          <v-flexible-link :to="author.url" raw>
            <v-simple-responsive-image
              v-if="author.photoID"
              :src="useImageUrl({ id: author.photoID })"
              :width="60"
              :height="60"
              :sizes="[1, 2]"
              :ratio="[1, 1]"
              alt="Author's image"
            />
            <img v-else src="/avatar.svg" alt="Author's image" />
          </v-flexible-link>
        </div>
      </div>
      <div>
        <div class="type-link">
          By
          <span v-for="(author, index) of authors" :key="author.name">
            <v-flexible-link :to="author.url" class="author-name">
              {{ author.name }}
            </v-flexible-link>
            <span v-if="author.organization">&nbsp;(</span>
            <v-flexible-link
              v-if="author.organization"
              :to="author.organizationUrl || null"
              class="author-name contributing-org"
            >
              {{ author.organization }}
            </v-flexible-link>
            <span v-if="author.organization">)</span>
            <span
              v-if="isMultipleAuthors && index !== authors.length - 1"
              class="author-name"
            >
              and
            </span>
          </span>
        </div>
        <date-published :article="props.article" />
        <v-flexible-link
          v-if="!isDisableComments"
          to="#comments"
          class="type-textlink2"
        >
          {{ comments }} comments
        </v-flexible-link>
      </div>
    </div>
    <hr />
    <!-- social share -->
    <v-share-tools label="Share" class="mt-3">
      <v-share-tools-item
        action="share"
        service="facebook"
        :url="shareUrl"
        :utm-parameters="{
          medium: 'social',
          source: 'facebook',
          campaign: 'shared_facebook',
        }"
        @share="
          sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Article Byline',
            event_label: 'Social Share Facebook',
          })
        "
      />

      <v-share-tools-item
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
          sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Article Byline',
            event_label: 'Social Share Twitter',
          })
        "
      />
      <v-share-tools-item
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
          sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Article Byline',
            event_label: 'Social Share Reddit',
          })
        "
      />
      <v-share-tools-item
        action="share"
        service="email"
        :url="shareUrl"
        :share-parameters="{ body: shareTitle + ' - %URL%' }"
        :utm-parameters="{
          medium: 'social',
          source: 'email',
          campaign: 'shared_email',
        }"
        @share="
          sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Article Byline',
            event_label: 'Social Share Email',
          })
        "
      />
    </v-share-tools>
    <hr class="mt-3 mb-5 xxl:hidden" />
  </div>
</template>

<style lang="scss">
.byline {
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
    .author-name {
      @include font-config($type-link);
    }
    a.author-name {
      &:hover {
        text-decoration: underline;
      }
    }
    .contributing-org {
      display: inline;
      color: var(--gray-600);
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
}
</style>
