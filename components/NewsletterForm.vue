<script setup>
//import gaEvent from '../utilities/ga.js'
import { ref } from 'vue'
import axios from 'axios'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()

const submitted = ref(false)
const submissionStatus = ref(null)
const email = ref('')
const checked = ref(true)

const props = defineProps({
  location: {
    type: String,
    default: null,
  },
})

// submit the newsletter form and add email address to the Gothamist Newsletter list
function submitForm() {
  submitted.value = true
  axios
    // .post(`https://api.prod.nypr.digital/email-proxy/subscribe`,
    .post(config.NEWSLETTER_API, {
      list: '65dbec786b',
      email: email.value,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(() => {
      submissionStatus.value = 'success'
      /* gaEvent(
        'Click Tracking',
        `Newsletter Signup: ${props.location}`,
        'Success'
      ) */
    })
    .catch(() => {
      submissionStatus.value = 'error'
      submitted.value = false
      // gaEvent('Click Tracking', `Newsletter Signup: ${props.location}`, 'Error')
    })
}
</script>

<template>
  <div class="newsletter-form">
    <span
      v-if="submissionStatus !== 'success'"
      class="flex flex-column lg:flex-row"
      style="gap: 1rem"
    >
      <div class="flex-grow-1">
        <InputText
          :disabled="submitted"
          class="w-full p-inputtext-lg"
          :class="[{ 'p-invalid': submissionStatus === 'error' }]"
          type="email"
          placeholder="your@email.com"
          aria-describedby="email-address-field"
          v-model="email"
          autocomplete="email"
          name="email"
          @keypress.enter="submitForm"
        />
        <small
          v-if="submissionStatus === 'error'"
          id="email-address-field"
          class="p-error px-4 mt-1 block"
          >Sorry, there was an error with your submission. Please try
          again!</small
        >
        <div class="field-checkbox mt-3">
          <Checkbox
            id="binary"
            v-model="checked"
            :binary="true"
            @click="!checked"
          />
          <label for="binary"><slot /></label>
        </div>
      </div>
      <div class="flex justify-content-end lg:justify-content-start">
        <Button
          :disabled="submitted || !checked"
          @click="submitForm"
          class="p-button-rounded"
          label="Subscribe"
        >
          <i v-if="submitted" class="pi pi-spin pi-spinner" />
        </Button>
      </div>
    </span>
    <p v-else>Thank you for signing up!</p>
  </div>
</template>

<style lang="scss">
.newsletter-form .p-button {
  width: 135px;
  height: 41px;
}

.newsletter-form .pi-spinner {
  font-size: 1.25rem;
  margin: auto;
}
.newsletter-form {
  .field-checkbox {
    .p-checkbox {
      align-self: flex-start;
    }
    label {
      @include font-config($type-fineprint);
    }
  }
}
</style>
