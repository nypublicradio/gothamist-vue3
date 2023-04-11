<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const config = useRuntimeConfig()

const props = defineProps({
  showNoThanks: {
    type: Boolean,
    default: false,
  },
  // This "source" field is to capture the location and site as part of the record in the CRM
  source: {
    type: String,
    default: 'gothamist_newsletter_landing_page',
  },
  altDesign: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  showBlurb: {
    type: Boolean,
    default: true,
  },
  showX: {
    type: Boolean,
    default: false,
  },
  submitButtonText: {
    type: String,
    default: 'Sign up',
  },
  titleText: {
    type: String,
    default: 'Never miss a story',
  },
  submitButtonIcon: {
    type: String,
    //default: 'pi-arrow-right',
    default: null,
  },
})

const emit = defineEmits<{
  (e: 'submit', value: any): void
}>()

const showComponent = ref(true)
const submissionStatus = ref(null)
const isSubmitting = ref(false)

// hides the entire component when the "No Thanks" button is clicked
const hideComp = () => {
  showComponent.value = false
}

// submit the newsletter form and add email address to the Gothamist Newsletter list
const submitForm = (email) => {
  isSubmitting.value = true
  submissionStatus.value = null
  $fetch(config.NEWSLETTER_API, {
    method: 'POST',
    body: {
      source: props.source,
      list: config.NEWSLETTER_MULTI_LIST_IDS,
      email: email,
    },
  })
    .then(() => {
      submissionStatus.value = 'success'
      emit('submit', 'success')
    })
    .catch(() => {
      submissionStatus.value = 'error'
      isSubmitting.value = false
      emit('submit', 'error')
    })
}
</script>

<template>
  <div
    v-if="showComponent"
    class="newsletter-home grid"
    :class="[{ small: props.small }]"
  >
    <Button
      v-if="props.showX"
      aria-label="Dismiss newsletter signup form"
      class="closer-x p-button-rounded p-button-sm p-button-text"
      icon="pi pi-times"
      @click="hideComp"
    />
    <div
      class="col-12 lg:col-3 pr-3 pb-2"
      :class="props.showX ? 'pr-6' : 'pr-3'"
    >
      <div class="h4">{{ titleText }}</div>
    </div>
    <div class="col-12 lg:col-7 xl:col-5 col-offset-0 xl:col-offset-1">
      <p v-if="showBlurb" class="type-paragraph2 pr-0 lg:pr-8 xl:pr-0">
        Catch up on the most important headlines with a roundup of essential NYC
        stories, delivered to your inbox daily.
      </p>
      <email-collector-form
        @noThanksClick="hideComp"
        @submit="submitForm"
        :class="showBlurb ? 'mt-5' : 'mt-2'"
        :showNoThanks="props.showNoThanks"
        :submitButtonText="props.submitButtonText"
        :submitButtonIcon="props.submitButtonIcon"
        :isSubmitting="isSubmitting"
        :submissionStatus="submissionStatus"
        :altDesign="props.altDesign"
        :outlined="props.outlined"
      >
        By submitting your information, you're agreeing to receive
        communications from New York Public Radio in accordance with our
        <v-flexible-link to="https://www.wnyc.org/terms/">Terms</v-flexible-link
        >.
      </email-collector-form>
    </div>
  </div>
</template>

<style lang="scss">
.newsletter-home {
  position: relative;
  .closer-x {
    position: absolute;
    top: 0;
    right: 0;
  }
  &.small {
    h4 {
      font-size: var(--font-size-7);
      line-height: var(--font-size-7);
      letter-spacing: -0.01em;
    }
    > div {
      flex: 0 0 auto;
      padding: 0.5rem;
      width: 100%;
      margin-left: 0 !important;
    }
  }
}
</style>
