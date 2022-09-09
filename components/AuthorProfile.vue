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
const ctaText = ref(props.sponsored ? 'Learn More' : 'Read more')
const profileImage = ref(
  props.sponsored ? profile.value.logo : profile.value.photoID
)
const profileLink = ref(
  props.sponsored ? profile.value.link : profile.value.url
)
const profileImageSizeLg = ref(157)
const profileImageSizeMd = ref(86)
const profileImageSizeSm = ref('60px')

const imageSize = ref(
  props.staffPage ? profileImageSizeLg.value : profileImageSizeMd.value
)
const imageSizePx = ref(imageSize.value + 'px')
</script>

<template>
  <div
    class="author-profile grid grid-nogutter"
    :class="[{ staffPage: props.staffPage }]"
  >
    <div class="col flex flex-column gap-2">
      <div
        class="flex flex-column align-items-start gap-2 md:flex-row md:align-items-center"
      >
        <v-flexible-link :to="profileLink" class="no-underline">
          <h5>{{ profile.name }}</h5>
        </v-flexible-link>
        <!-- profile.social is not supported in the response yet. This will be updated as part of a CMS ticket -->
        <span v-if="profile.social">
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
      <p
        v-if="profile.biography"
        class="p2"
        :class="props.staffPage ? '' : 'truncate t3lines'"
      >
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
            :sizes="[2]"
            :ratio="[1, 1]"
            alt="Author's image"
            :loading="props.staffPage ? 'eager' : 'lazy'"
          />
          <img
            v-else
            src="/avatar.svg"
            alt="Author's image"
            :loading="props.staffPage ? 'eager' : 'lazy'"
          />
        </v-flexible-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.author-profile {
  gap: 1rem;
  .col-fixed {
    max-width: v-bind(imageSizePx) !important;
    @include media('<md') {
      max-width: v-bind(profileImageSizeSm) !important;
    }
    .profile {
      box-sizing: content-box;
      width: v-bind(imageSizePx);
      @include media('<md') {
        width: v-bind(profileImageSizeSm);
      }
    }
  }
  .author-image {
    background: #ffffff;
    width: v-bind(imageSizePx);
    height: v-bind(imageSizePx);
    border-radius: 50%;
    margin-right: 12px;
    overflow: hidden;
    img {
      width: v-bind(imageSizePx);
      height: v-bind(imageSizePx);
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
    .flexible-link {
      pointer-events: none;
    }
  }
}
</style>
