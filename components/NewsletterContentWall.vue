
<script setup lang="ts">
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
const lists = ref(['Gothamist','Gothamist - Early Addition'])
const email = ref<string>(null)

const newsletterSignup = useNewsletterSignup({
  email, 
  lists,
  consent: agree
})

</script>

<template>
  <div class="regwall">
    <div class="regwall-wrapper">
      <template
        v-if="!newsletterSignup.isSuccess.value"
      >
        <h2 class="regwall-header mod-left">
          Read this story completely free.
        </h2>
        <div class="regwall-text mod-left">
          To continue reading, sign up for our daily newsletter and get unlimited access to Gothamist.com.
        </div>
        <form
          class="gtm__click-tracking regwall-form"
          @submit="newsletterSignup.submitForm"
        >
          <label
            for="newsletter"
            class="is-vishidden"
          >
            newsletter signup
          </label>
          <div class="regwall-form-wrapper">
            <div
              class="inline-button regwall-form-email"
            >
              <input
                id="newsletter"
                v-model="email"
                name="newsletter"
                placeholder="your@email.com"
                class="regwall-form-email-input"
                required
                type="email"
              >
              <button
                class="regwall-form-email-submit"
                data-label="Footer"
                data-action="Newsletter Signup"
                data-category="Click Tracking"
                data-test-newsletter-submit=""
                type="submit"
                :disabled="!newsletterSignup.isFormValid.value"
              >
                <gothamist-arrow v-if="!newsletterSignup.isSuccess.value" />
                <loading-icon
                  v-else
                  class="regwall-form-email-button-loading"
                />
              </button>
            </div>
          </div>
          <div
            v-if="newsletterSignup.isError.value"
            class="regwall-form-error"
          >
            Sorry, there was an error with your submission. Please try again!
          </div>
          <div
            class="regwall-form-terms"
          >
            <fieldset>
              <legend class="is-vishidden">
                Terms
              </legend>
              <label>
                <input
                  v-model="agree"
                  type="checkbox"
                  required
                  checked
                >
                By submitting your information, you're agreeing to receive communications from New York Public Radio in accordance with our
                <a
                  href="https://www.wnyc.org/terms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="u-has-accent"
                >Terms</a>.
              </label>
            </fieldset>
          </div>
          <v-button class="regwall-button mod-flat" label="No thanks" @click="decline" />
        </form>
      </template>
      <template
        v-if="newsletterSignup.isSuccess.value"
        class="regwall-form__submit"
      >
        <div class="regwall-graphic">
          <party-confetti />
        </div>
        <h2 class="regwall-header">
          Thanks for subscribing!
        </h2>
        <div class="regwall-text">
          You just got yourself access to all our articles, old and new.
        </div>
        <v-button class="regwall-button" label="Start Reading" @click="startReading" />
      </template>
      <template
        v-if="status === 'declined'"
      >
        <h2 class="regwall-header">
          No hard feelings...
        </h2>
        <div class="regwall-text">
          You can still read the latest and greatest stories on Gothamist.com
        </div>
        <v-button class="regwall-button" label="Back to Homepage" @click="goToHomepage" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.regwall {
  margin: 0 auto;
}
.regwall-form {
  position: relative;
  width: 100%;
  @include typeface(body, 4);
}
.regwall-form-wrapper > .button {
  margin: var(--space-4)
}
.regwall-graphic {
  width: 108px;
  height: 108px;
  margin:  0 auto 16px;
  top: -50px;
  left: -10px;
  @include media(">xlarge") {
    z-index: 0;
    top: 50px;
    left: -120px;
  }
}
.regwall-graphic .party-confetti-icon {
  position: relative;
}
.regwall-graphic .party-confetti-icon path {
  fill: RGB(var(--color-text));
  width: 108px;
  height: 108px;
  position: absolute;
  z-index: 1
}
.regwall-graphic:before {
  content: "";
  background-color: RGB(var(--color-banana-yellow));
  height: 75px;
  width: 75px;
  position: absolute;
  top: 54px;
  left: calc(50% - 75px/2 + 4px);
  z-index: 0
}
.regwall-form  {
  --color-button: RGB(var(--color-taxicab-yellow))
}
.regwall-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: RGB(var(--color-background-muted));
  border: 3px solid RGB(var(--color-dark-gray));
  padding: var(--space-5) var(--space-4);
  @include media(">xlarge") {
    z-index: 1;
  }
}
.regwall-header {
  font-family:  var(--font-family-subheader);
  font-weight:  var(--font-weight-subheader);
  font-size:  var(--font-size-8);
  text-align: center;
  margin-bottom: var(--space-1);
}
.regwall-text {
  text-align: center;
  margin-bottom: var(--space-3);
}
.regwall-header.mod-left,
.regwall-text.mod-left {
  text-align: left;
}
.regwall-button {
  height: 40px;
  padding: var(--space-3);
  margin: 0 auto;
  background-color: RGB(var(--color-banana-yellow));
  &>span {
    font-size: var(--font-size-5);
    font-weight: 700;
    letter-spacing: var(--letter-spacing-small);
  }
  &:hover {
    background-color: RGB(var(--color-banana-yellow));
  }
}
.regwall-button.mod-flat {
  color: var(--color-black);
  margin: var(--space-2) 0;
  padding: var(--space-1) 0;
  &>span {
    text-transform: none;
    font-family: var(--font-body);
    font-size: var(--font-size-5);
    font-weight: 400;
  }
  &:hover {
    background: transparent;
    color: var(--color-black);
    opacity: 0.8;
  }
  &:before {
    display: none;
  }
}
.regwall-form .o-gothamist-arrow-icon {
  width: 20px;
  height: 20px;
  margin-right: var(--space-2);
  vertical-align: text-top;
}
.regwall-form-email {
  border: solid 2px RGB(var(--color-dark-gray));
  border-radius: 0 !important;
  margin: 0 0 var(--space-4) ;
  position: relative;
  z-index: 3;
}
.regwall-form-email-input {
  border: none;
  height: 60px;
}
.regwall-form-email-submit {
  background-color: RGB(var(--color-banana-yellow));
  border: none;
  height: 60px;
  width: 70px;
  margin: 0;
  cursor: pointer;
  &:hover {
    background-color: RGB(var(--color-reddish-orange));
    transform: none;
    .o-gothamist-arrow-icon {
      animation: bounceHorizontal .8s 0s ease-in-out infinite;
    }
  }
  &::before,
  &::after {
    display: none;
  }
}
.regwall-form-email-submit[disabled] {
  cursor: not-allowed;
  opacity: .6;
}
.regwall-form .regwall-form-email-submit .o-gothamist-arrow-icon,
.regwall-form-email-submit .o-gothamist-arrow-icon {
  width: 24px;
  margin: 0;
  path {
    fill: RGB(var(--color-black));
  }
}
.reg-wall-form-button {
  background-color: RGB(var(--color-banana-yellow));
}
.regwall-form-terms {
  padding-left: 25px;
  margin-bottom: var(--space-3);
  position: relative;
}
.regwall-form-terms input[type="checkbox"] {
  position: absolute;
  left: -25px;
  top: 2px;
  border: none !important;
  width: 17px;
  height: 17px;
  background-color: RGB(var(--color-banana-yellow));
  color: RGB(var(--color-black));
  background-size: 10px !important;
}
.regwall-form-terms input[type=checkbox]:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath d='M26.08,3.56l-2,1.95L10.61,19l-5-4L3.47,13.29,0,17.62l2.17,1.73L9.1,24.9,11,26.44l1.77-1.76L28.05,9.43,30,7.48Z' fill='%23000000'/%3E%3C/svg%3E");
}
.regwall-form-terms label {
  @include typeface(body, 3);
}
.regwall-form-terms a {
  color: RGB(var(--color-text));
  border-bottom: 2px dotted RGB(var(--color-text));
  &:hover {
    background-color: RGB(var(--color-reddish-orange));
  }
}
.regwall-form-email-submit {
  font-weight: bold;
}
.regwall-form-loading {
  max-width: 30px;
}
</style>