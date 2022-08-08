<script setup>
import { ref } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'

const props = defineProps({
  profileData: {
    type: Object,
    default: {},
  },
  showCta: {
    type: Boolean,
    default: true,
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
  staffPage: {
    type: Boolean,
    default: false,
  },
})

const profile = ref(props.profileData)
const ctaText = ref(props.sponsored ? 'Read more' : 'Learn More')
const profileImage = ref(
  props.sponsored ? profile.value.logo : profile.value.photoID
)
const profileLink = ref(
  props.sponsored ? profile.value.link : profile.value.url
)
const profileImageSizeLg = ref(157)
const profileImageSizeMd = ref(86)
const profileImageSizeSm = ref(60)

const imageSize = ref(
  props.staffImage ? profileImageSizeLg.value : profileImageSizeMd.value
)
</script>

<template>
  <div
    class="article-footer-profile grid"
    :class="[{ staffPage: props.staffPage }]"
  >
    <div class="col md:pr-4 flex flex-column gap-2">
      <div
        class="flex flex-column align-items-start gap-2 md:flex-row md:align-items-center"
      >
        <v-flexible-link :to="profileLink" class="no-underline">
          <h5>{{ profile.name }}</h5>
        </v-flexible-link>
        <span v-if="!profile.social">
          <v-share-tools class="">
            <v-share-tools-item service="facebook" username="gothamist" />
            <v-share-tools-item service="twitter" username="gothamist" />
            <v-share-tools-item service="instagram" username="gothamist" />
            <v-share-tools-item
              service="youtube"
              username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
            />
          </v-share-tools>
        </span>
      </div>
      <p v-if="profile.biography" class="p2 truncate t3lines">
        {{ profile.biography }}
      </p>
      <v-flexible-link v-if="showCta" :to="profileLink" class="type-textlink1">
        {{ ctaText }}
      </v-flexible-link>
    </div>
    <div class="col-fixed profile">
      <div class="author-image">
        <v-flexible-link :to="profileLink" raw>
          <v-simple-responsive-image
            v-if="profileImage"
            :src="useImageUrl({ id: profileImage })"
            :width="imageSize"
            :height="imageSize"
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
    width: v-bind(profileImageSizeMd);
    height: v-bind(profileImageSizeMd);
    border-radius: 50%;
    margin-right: 12px;
    overflow: hidden;
    img {
      width: v-bind(profileImageSizeMd);
      height: v-bind(profileImageSizeMd);
    }
    @include media('<md') {
      width: v-bind(profileImageSizeSm);
      height: v-bind(profileImageSizeSm);
      img {
        width: v-bind(profileImageSizeSm);
        height: v-bind(profileImageSizeSm);
      }
    }
  }
  &.staffPage {
    flex-direction: row-reverse;
    .author-image {
      width: v-bind(profileImageSizeLg);
      height: v-bind(profileImageSizeLg);
      img {
        width: v-bind(profileImageSizeLg);
        height: v-bind(profileImageSizeLg);
      }
    }
  }
}
</style>
