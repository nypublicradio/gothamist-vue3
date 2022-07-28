<script setup>
import { ref, computed, onMounted } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'
const props = defineProps({
  profileData: {
    type: Object,
    default: {},
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
})

const profile = ref(props.profileData)

//const emit = defineEmits(["change", "click"]);

// lifecycle hooks
onMounted(() => {
  console.log('profile = ', profile.value)
})
</script>

<template>
  <div class="article-footer-profile flex pr-0 md:pr-3">
    <div class="col">
      text goes here text goes here text goes here text goes here text goes here
      text goes here text goes here text goes here
    </div>
    <div class="col-fixed profile">
      <div class="author-image">
        <v-flexible-link :to="profile.url" raw>
          <v-simple-responsive-image
            v-if="profile.photoID"
            :src="useImageUrl({ id: profile.photoID })"
            :width="86"
            :height="86"
            :sizes="[1, 2]"
            :ratio="[1, 1]"
            alt="Author's image"
          />
          <img v-else src="/avatar.svg" alt="Author's image" />
        </v-flexible-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.article-footer-profile {
  .col-fixed.profile {
    width: 102px;
    @include media('<md') {
      width: 76px;
    }
  }
  .author-image {
    background: #ffffff;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    margin-right: 12px;
    overflow: hidden;
    img {
      width: 86px;
      height: 86px;
    }
    @include media('<md') {
      width: 60px;
      height: 60px;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
