<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue'
import { formatDateAndTime } from '~/utilities/date'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const authors = ref(props.article?.authors || [])
const date = ref(new Date(props.article?.publicationDate) || null)
const comments = ref(props.article?.comments || 24)

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div class="byline">
    <hr class="black" />
    <div class="author flex align-items-center py-4">
      <div v-for="author of authors" class="author-images">
        <div class="author-image mr-3">
          <v-flexible-link :to="article.url" raw>
            <img :src="author.photoID || '/avatar.svg'" />
          </v-flexible-link>
        </div>
      </div>
      <div>
        <div v-for="author of authors">
          <v-flexible-link :to="article.url" class="author-name">
            By {{ author.name }}
          </v-flexible-link>
        </div>
        <p class="type-caption">Published {{ formatDateAndTime(date) }}</p>
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
  .author {
    display: flex;
    align-items: center;
    .author-image {
      background: #ffffff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .author-name {
      @include font-config($type-link);
      &:hover {
        text-decoration: underline;
      }
    }
    .comments {
      @include font-config($type-textlink2);
    }
  }
}
</style>
