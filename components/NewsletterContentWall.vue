<script setup lang="ts">
import Button from 'primevue/button'
const config =  useRuntimeConfig()
const emit = defineEmits<{
  (e:'wall-cleared'):void
}>()
const status = ref('')
const decline = () => {
  status.value = 'declined'
}
const goToHomepage = () => {
  const router = useRouter()
  router.push('/')
}
const startReading = () => {
  emit('wall-cleared')
}

const agree = ref(true)
const lists = ref(config.public.NEWSLETTER_MULTI_LIST_IDS.split('++'))
const email = ref<string>(null)

const newsletterSignup = useNewsletterSignup({
  email,
  lists,
  consent: agree
})

const handleSubmit = (emailAddress) => {
  email.value = emailAddress
  newsletterSignup.submitForm()
}

</script>

<template>
  <div class="regwall">
    <div class="regwall-wrapper mt-5 mb-4">
      <template
        v-if="!newsletterSignup.isSuccess.value && status !== 'declined'"
      >
        <hr class="black mb-4"/>
        <h2 class="regwall-header mod-left mb-2">
          Read this story completely free.
        </h2>
        <div class="regwall-text mod-left mb-3">
          To continue reading, sign up for our daily newsletter and get unlimited access to Gothamist.com.
          <a class="regwall-why-link" href="https://gothamist.com">Why am I seeing this?</a>
        </div>
        <form
          class="gtm__click-tracking regwall-form"
        >
          <label
            for="newsletter"
            class="sr-only"
          >
            newsletter signup
          </label>
          <div class="regwall-form-wrapper">
            <email-collector-form
              @noThanksClick="decline"
              @submit="handleSubmit"
              class="mt-2"
              :showNoThanks="true"
              submitButtonText="Sign Up"
              :isSubmitting="newsletterSignup.isSubmitting.value"
              :submissionStatus="newsletterSignup.isError.value ? 'error' : newsletterSignup.isSuccess.value ? 'success' : ''"
              :altDesign="false"
              :outlined="false"
              :small="false"
            >
              By submitting your information, you're agreeing to receive
              communications from New York Public Radio in accordance with our
              <a href="https://www.wnyc.org/terms/" target="_blank" rel="noopener noreferrer">Terms</a
              >.
            </email-collector-form>
          </div>
          <div
            v-if="newsletterSignup.isError.value"
            class="regwall-form-error"
          >
            Sorry, there was an error with your submission. Please try again!
          </div>
        </form>
      </template>
      <template
        v-if="newsletterSignup.isSuccess.value"
        class="regwall-form__submit"
      >
        <h2 class="regwall-header mb-2">
          Thanks for subscribing!
        </h2>
        <div class="regwall-text mb-3">
          You just got yourself access to all our articles, old and new.
        </div>
        <Button class="regwall-button" label="Start Reading" @click="startReading" />
      </template>
      <template
        v-if="status === 'declined'"
      >
        <h2 class="regwall-header mb-2">
          No hard feelings...
        </h2>
        <div class="regwall-text mb-3">
          You can still read the latest and greatest stories on Gothamist.com
        </div>
        <Button class="regwall-button" label="Back to Homepage" @click="goToHomepage" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.regwall {
  margin: 0 auto;
  background-color: white;
  margin-top: 150px;
}
.regwall-form {
  position: relative;
  width: 100%;
  font-family: var(--font-family-body);
  font-size: var(--font-size-4);
  line-height: 1.2;
}
.regwall-form-wrapper > .button {
  margin: var(--space-4)
}
.regwall-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: RGB(var(--color-background-muted));
  border: 3px solid RGB(var(--color-dark-gray));
  @include media(">xlarge") {
    z-index: 1;
  }
}
.regwall-header {
  text-align: center;
  font-size: var(--font-size-11);
}

a.regwall-why-link {
  font-family: var(--font-family-header);
  font-weight: 700;
}
.regwall-text {
  text-align: center;
}
.regwall-header.mod-left,
.regwall-text.mod-left {
  text-align: left;
}
</style>