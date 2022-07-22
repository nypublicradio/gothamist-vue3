<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const config = useRuntimeConfig()

const props = defineProps({
  showNoThanks: {
    type: Boolean,
    default: false,
  },
  altDesign: {
    type: Boolean,
    default: false,
  },
  submitButtonText: {
    type: String,
    default: 'Sign up',
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
  axios
    .post(config.NEWSLETTER_API, {
      list: config.NEWSLETTER_LIST_ID,
      email: email,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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
  <div v-if="showComponent" class="newsletter-home grid grid-nogutter">
    <divider />

    <div class="col-12 lg:col-3 pr-3 pb-2">
      <h4>Never miss a story in your neighborhood</h4>
    </div>
    <div class="col-12 lg:col-7 xl:col-5 col-offset-0 xl:col-offset-1">
      <p class="type-paragraph2 pr-0 lg:pr-8 xl:pr-0">
        Catch up on the most important headlines of the day with a roundup of
        essential NYC news, delivered to your inbox every day at 5pm.
      </p>
      <email-collector-form
        @noThanksClick="hideComp"
        @submit="submitForm"
        class="mt-5"
        :showNoThanks="props.showNoThanks"
        :submitButtonText="props.submitButtonText"
        :submitButtonIcon="props.submitButtonIcon"
        :isSubmitting="isSubmitting"
        :submissionStatus="submissionStatus"
        :altDesign="props.altDesign"
      >
        By submitting your information, you're agreeing to receive
        communications from New York Public Radio in accordance with our
        <v-flexible-link to="/terms">Terms</v-flexible-link>.
      </email-collector-form>
    </div>
  </div>
</template>

<style lang="scss">
.newsletter-home {
  padding-bottom: 3rem;
  .p-divider {
    margin-bottom: 1.5rem;
    &:before {
      border-color: var(--black);
    }
  }
}
</style>
