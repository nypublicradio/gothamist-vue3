<script setup>
import { ref } from 'vue'
import { formatDateAndTime } from '~/utilities/date'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const authors = ref(props.article.authors)
const isMultipleAuthors = ref(authors.value.length > 0)
const date = ref(props.article?.publicationDate || null)
const updatedDate = ref(props.article?.updatedDate || null)
const comments = ref(props.article?.comments || null)
const isSponsored = ref(props.article?.sponsoredContent || false)
const sponsor = ref(props.article?.sponsors[0] || [])

const getSponsorImage = (sponsorLogoID) => {
  //need backend work to get the sponsored image
  //return sponsorLogoID || '/sponsor-default.jpg'
  return '/sponsor-default.jpg'
}
</script>

<template>
  <div class="byline">
    <hr class="black" />

    <!-- sponsored -->
    <div v-if="isSponsored" class="sponsored flex align-items-center py-4">
      <div class="author-image mr-3">
        <v-flexible-link :to="sponsor.link" raw>
          <img
            :src="getSponsorImage(sponsor.logo) || '/avatar.svg'"
            alt="Sponsor's image"
          />
        </v-flexible-link>
      </div>
      <div>
        <p class="type-caption">Article sponsored by</p>
        <v-flexible-link :to="sponsor.link" class="author-name" raw>
          {{ sponsor.name }}
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
        <div v-for="author of authors" class="author-image mr-3">
          <v-flexible-link :to="author.url" raw>
            <img src="/avatar.svg" alt="Author's image" />
          </v-flexible-link>
        </div>
      </div>
      <div>
        <div class="author-name">
          By
          <span v-for="(author, index) of authors">
            <v-flexible-link :to="author.url" class="author-name">
              {{ author.name }}
            </v-flexible-link>
            <span
              v-if="isMultipleAuthors && index !== authors.length - 1"
              class="author-name"
            >
              &nbsp;and&nbsp;
            </span>
          </span>
        </div>

        <p class="type-caption">Published: {{ formatDateAndTime(date) }}</p>
        <p v-if="updatedDate" class="type-caption">
          Updated: {{ formatDateAndTime(updatedDate) }}
        </p>
        <v-flexible-link v-if="comments" to="#comments" class="comments">
          {{ comments }} Comments
        </v-flexible-link>
      </div>
    </div>
    <hr />
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
      overflow: hidden;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .author-name {
      @include font-config($type-link);
      .flexible-link {
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .comments {
      @include font-config($type-textlink2);
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
