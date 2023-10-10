<script setup lang="ts">
import Button from 'primevue/button'

const emit = defineEmits<{
  (e: 'sign-up'): void
  (e: 'wall-cleared'): void
}>()
const status = ref('')
function decline() {
  status.value = 'declined'
}
function unDecline() {
  status.value = ''
}
function startReading() {
  emit('wall-cleared')
}

const agree = ref(true)
const selectedLists = ref(['Gothamist Membership', 'Gothamist - Early Addition'])
const email = ref<string>(null)

const newsletterSignup = useNewsletterSignup({
  email,
  selectedLists,
  consent: agree,
  source: 'gothamist_archive_regWall',
})

function handleSubmit(emailAddress) {
  email.value = emailAddress
  newsletterSignup.submitForm()
}

watch(newsletterSignup.isSuccess, (value) => {
  if (value) {
    emit('sign-up')
    setTimeout(() => { document.querySelector('.regwall-success-buttons button')?.focus() }, 1)
    setTimeout(startReading, 5000)
  }
})
</script>

<template>
  <div class="regwall">
    <div class="regwall-wrapper mt-5 mb-4">
      <hr class="black mb-4">
      <template
        v-if="!newsletterSignup.isSuccess.value && status !== 'declined'"
      >
        <h2 class="regwall-header">
          Read this story completely free
        </h2>
        <div class="regwall-text mb-4">
          To continue reading, sign up for our daily newsletter and get unlimited access to Gothamist.com.
          <a class="regwall-link" href="https://gothamist.com/archived-stories-faq">Why am I seeing this?</a>
        </div>
        <form
          class="gtm__click-tracking regwall-form"
          @submit.prevent
        >
          <label
            for="newsletter"
            class="sr-only"
          >
            newsletter signup
          </label>
          <div class="regwall-form-wrapper">
            <email-collector-form
              class="mt-2"
              :show-no-thanks="true"
              submit-button-text="Sign Up"
              :is-submitting="newsletterSignup.isSubmitting.value"
              :submission-status="newsletterSignup.isError.value ? 'error' : newsletterSignup.isSuccess.value ? 'success' : ''"
              :alt-design="false"
              :outlined="false"
              :small="false"
              @noThanksClick="decline"
              @submit="handleSubmit"
            >
              By submitting your information, you're agreeing to receive
              communications from New York Public Radio in accordance with our
              <a href="https://www.wnyc.org/terms/" target="_blank" rel="noopener noreferrer">Terms</a>.
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
        <h2 class="regwall-header">
          Thanks for subscribing!
        </h2>
        <div class="regwall-text mb-4">
          You just got yourself access to all our articles, old and new.
        </div>
        <div class="regwall-success-buttons">
          <Button class="regwall-button regwall-start-button  p-button-rounded" label="Start Reading" @click="startReading" />
        </div>
      </template>
      <template
        v-if="status === 'declined'"
      >
        <h2 class="regwall-header">
          No hard feelings...
        </h2>
        <div class="regwall-text mb-4">
          You can still read the latest and greatest stories on Gothamist.com
        </div>
        <div class="regwall-decline-buttons">
          <Button class="regwall-button regwall-back-button p-button-rounded" label="Go back to sign up" @click="unDecline" />
          <NuxtLink to="/" class="regwall-link">
            Back to home
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.regwall {
  margin: 0;
  background-color: white;
  margin-top: 150px;
}
.regwall-form {
  position: relative;
  width: 100%;
  font-family: var(--font-family-body);
}
.regwall-form-wrapper > .button {
  margin: var(--space-4)
}
.regwall-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: RGB(var(--color-background-muted));
  border: 3px solid RGB(var(--color-dark-gray));
  @include media(">xlarge") {
    z-index: 1;
  }
}
.regwall-header {
  text-align: left;
  font-size: var(--font-size-11);
  padding-bottom: 8px;
  @include media(">large") {
    padding-bottom: 0px;
    font-size: var(--font-size-14);
  }
  padding-right: 4rem;
}
a.regwall-link {
  font-family: var(--font-family-header);
  font-weight: 700;
}
.regwall-text {
  text-align: left;
  line-height: 1.2;
  font-size: var(--font-size-6);
  padding-bottom: 8px;
  @include media(">large") {
    font-size: var(--font-size-6);
  }
  padding-right: 4rem;
}
.regwall .email-collector-form .field-checkbox label {
  font-size: var(--font-size-5);
  padding-right: 4rem;
  @include media(">medium") {
    padding: 0;
  }
}
.regwall .email-collector-form > span > div:first-child {
  @include media(">medium") {
    width: 50%;
    flex-grow: 0 !important;
  }
}
.no-thanks-btn {
  font-weight: 700;
  @include media(">large") {
    padding-top: 32px;
  }
}
.regwall-back-button {
  min-width: 135px;
  width: calc(50% - 0.5rem);
  margin-right: 1rem;
}
.regwall-decline-buttons {
  display: flex;
  align-items: center;
}
</style>
