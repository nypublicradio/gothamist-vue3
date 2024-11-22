<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'

const props = defineProps({
  profileData: {
    type: Object,
    default() { return {} },
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
  props.sponsored ? profile.value.logo : profile.value.photoID,
)
const profileLink = ref(
  props.sponsored ? profile.value.link : profile.value.url,
)
const profileImageSizeLg = ref(157)
const profileImageSizeMd = ref(86)
const profileImageSizeSm = ref('60px')

const imageSize = ref(
  props.staffPage ? profileImageSizeLg.value : profileImageSizeMd.value,
)
const imageSizePx = ref(`${imageSize.value}px`)
// for services where the domain doesn't change we can just use the username
function accountNameFromProfile(account) {
  if (!['mastodon', 'homepage'].includes(account.service))
    return url?.split('/').filter(str => str !== '').slice(-1)[0]
  return ''
}
// otherwise we need to use the full url
function urlFromProfile(account) {
  if (!['mastodon', 'homepage'].includes(account.service))
    return account.profileUrl
  return ''
}
</script>

<template>
  <div
    class="author-profile grid grid-nogutter"
    :class="[{ staffPage: props.staffPage }]"
  >
    <div class="col-fixed profile">
      <div class="author-image">
        <VFlexibleLink
          :to="profileLink"
          raw
          :aria-hidden="true"
          :tabindex="-1"
        >
          <VSimpleResponsiveImage
            v-if="profileImage"
            :src="useImageUrl({ id: profileImage })"
            :width="imageSize"
            :height="imageSize"
            :sizes="[2]"
            :ratio="[1, 1]"
            :loading="props.staffPage ? 'eager' : 'lazy'"
            alt=""
          />
          <img
            v-else
            src="/avatar.svg"
            :loading="props.staffPage ? 'eager' : 'lazy'"
            alt=""
          >
        </VFlexibleLink>
      </div>
    </div>
    <div class="col flex flex-column gap-2">
      <div
        class="flex flex-column align-items-start gap-2 md:flex-row md:align-items-center"
      >
        <VFlexibleLink :to="profileLink" class="no-underline">
          <div class="h5">
            {{ profile.name }}
          </div>
        </VFlexibleLink>
        <span v-if="profile.socialMediaProfile">
          <VShareTools class="">
            <VShareToolsItem
              v-for="account in profile.socialMediaProfile"
              :key="account.id"
              :service="account.service"
              :username="accountNameFromProfile(account)"
              :link="urlFromProfile(account)"
            />
          </VShareTools>
        </span>
      </div>
      <p
        v-if="profile.biography"
        class="p2"
        :class="props.staffPage ? '' : 'truncate t3lines'"
      >
        {{ profile.biography }}
      </p>
      <VFlexibleLink v-if="showCta" :to="profileLink" class="type-textlink1">
        {{ ctaText }}
      </VFlexibleLink>
    </div>
  </div>
</template>

<style lang="scss">
.author-profile {
  gap: 1.5rem;
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
