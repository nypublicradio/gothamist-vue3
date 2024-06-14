<script setup lang="ts">
import { CacheControlAgeTime } from '~/composables/types/CacheControlAgeTime'

const config = useRuntimeConfig()

const newsletters = [
  {
    title: 'Early Addition',
    id: 'Gothamist - Early Addition',
    description: 'Start your weekdays with a guide of the local stories you need to know, plus tidbits from around the internet.',
  },
  {
    title: 'Evening Headlines',
    id: 'Gothamist',
    description: 'Get links to our top stories delivered to your inbox every day at 5 p.m.',
  },
  {
    title: 'On The Way',
    id: 'We The Commuters',
    description: 'The week’s transit news, exclusive analysis, answers to your burning commuter questions and more.',
  },
  {
    title: 'Politics Brief',
    id: 'Politics Brief Newsletter',
    description: 'Everything you need to know as a voter in New York or New Jersey.',
  },
]
const thanksMessage = 'Thank you for signing up!'
const errorMessage = 'Sorry! There was a problem signing you up. Please try again later'

const selectedLists = ref<Array<string>>(newsletters.map(newsletter => newsletter.id))
const agree = ref(true)
const email = ref<string>(null)

const cacheControlMaxAge = useCacheControlMaxAge()
const newsletterSignup = useNewsletterSignup({
  email,
  selectedLists,
  additionalLists: ref(['Gothamist Membership']),
  consent: agree,
  source: 'gothamist_newsletter_landing_page',
})
cacheControlMaxAge.value = CacheControlAgeTime.QUARTER

useHead({
  link: [{ rel: 'canonical', href: `https://${config.public.CANONICAL_HOST}/newsletters` }],
})
</script>

<template>
  <div class="newsletter-page">
    <section>
      <div class="content">
        <form class="newsletter-form" @submit="newsletterSignup.submitForm">
          <div v-if="!newsletterSignup.isSuccess.value" class="form">
            <h1>Newsletters</h1>
            <p>Get the news New Yorkers need in your inbox.</p>
            <div class="field">
              <label for="email">Email address</label>
              <InputText
                v-model="email"
                class="w-full p-inputtext-lg"
                type="email"
                required="required"
                placeholder="your@email.com"
                aria-label="sign up"
                aria-describedby="email-address-field"
                enterkeyhint="send"
                autocomplete="email"
                name="email"
              />
            </div>
            <div v-if="!newsletterSignup.isSuccess.value" class="newsletter-list">
              <div v-for="(newsletter, index) in newsletters" :key="newsletter.id" class="newsletter-list-item">
                <div class="newsletter-checkbox">
                  <Checkbox
                    v-model="selectedLists"
                    :input-id="`newsletter-${index}`"
                    :value="newsletter.id"
                  />
                </div>
                <div class="newsletter-info">
                  <div><label :for="`newsletter-${index}`">{{ newsletter.title }}</label></div>
                  <div>{{ newsletter.description }}</div>
                </div>
              </div>
            </div>
            <div v-if="newsletterSignup.isError.value" class="newsletter-error">
              {{ errorMessage }}
            </div>
            <div class="newsletter-agree field-checkbox mt-3 mb-0">
              <Checkbox
                id="agree"
                v-model="agree"
                aria-label="Toggle agreement to the terms"
                :disabled="newsletterSignup.isSubmitting.value"
                :binary="true"
              />
              <label for="agree">
                By submitting your information, you're agreeing to receive
                communications from New York Public Radio in accordance with our
                <a href="https://www.wnyc.org/terms/" target="_blank" rel="noopener noreferrer">Terms</a>.
              </label>
              <Button
                id="sign-up"
                :class="!newsletterSignup.isFormValid.value || newsletterSignup.isSubmitting.value ? 'disabled' : ''"
                :aria-disabled="!newsletterSignup.isFormValid.value || newsletterSignup.isSubmitting.value"
                :type="newsletterSignup.isFormValid.value || newsletterSignup.isSubmitting.value ? 'submit' : 'button'"
                class="submit-btn p-button-rounded"
                label="Sign Up"
                aria-label="Sign Up"
              />
            </div>
          </div>
          <div v-else class="newsletter-thanks mt-3 mb-0">
            {{ thanksMessage }}
          </div>
        </form>
        <div class="hero">
          <div class="phone">
            <div class="notch-container">
              <div class="notch" />
            </div>
            <img src="/newsletter-preview.png" srcset="/newsletter-preview@2x.png 2x, /newsletter-preview@3x.png 3x" alt="">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.p-button.disabled {
  opacity: var(--disabled-opacity);
  color: var(--text-color);
  background: var(--disabled-background);
  color: var(--button-text-disabled-color);
  cursor: not-allowed;
}
.newsletter-page .content {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.newsletter-form {
  width: 550px;
  max-width: 100vw;
}
.newsletter-form p {
  margin-bottom: 1rem;
}
.newsletter-agree {
  background: var(--soybean200);
  width: 100vw;
  min-height: 64px;
  padding: 10px;
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  @include media('>md') {
    position: static;
    background: transparent;
    width: auto;
    padding: 12px 20px;
  }
}
.newsletter-thanks {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: var(--font-family-header);
  font-size: var(--font-size-6);
  @include media('>md') {
    padding: 12px 20px;
  }
}
.newsletter-error {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: red;
  font-family: var(--font-family-header);
  font-size: var(--font-size-6);
  @include media('>md') {
    padding: 12px 20px 0 20px;
  }
}
.newsletter-agree label {
  font-size: var(--font-size-3);
  line-height: 1.25;
  padding: 0 12px;
}
.newsletter-agree .submit-btn {
  font-size: var(--font-size-6);
  white-space: nowrap;
  overflow: visible;
  width: fit-content;
}
.newsletter-list-item {
  display: flex;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 12px 20px;
  margin: 10px 0;
}
.newsletter-checkbox {
  margin-right: 10px;
}
.newsletter-info {
  display: flex;
  flex-direction: column;
  color: var(--text-color);
  font-family: var(--font-family-header);
  font-size: var(--font-size-5);
  letter-spacing: -.02em;
  line-height: var(--font-size-5);
  @include media('>md') {
    flex-direction: row;
    > div:first-child {
      flex: 0 0 140px;
    }
  }
  > div:nth-child(2) {
    font-size: var(--font-size-4);
  }
}
.newsletter-info label {
  display: inline-block;
  font-weight: 600;
  margin-bottom: 4px;
}
.newsletter-page .hero {
  display: none;
  @include media('>lg') {
    display: flex;
    justify-content: center;
    .phone {
      height: 60vh;
      width: calc(60vh * 9/17);
      overflow: hidden;
      border: 6px solid black;
      border-radius: 5vh;
      background: #fff;
      box-shadow: 0px 20px 20px 0px rgba(0,0,0,0.1);
      img {
        width: 100%;
        margin-top: -2.5vh;
      }
    }
    .notch-container {
      display: flex;
      justify-content: center;
      .notch {
        z-index: 1;
        width: 50%;
        border: 2.5vh solid black;
        border-top: 0;
        border-radius: 0 0 2vh 2vh;
      }
    }
  }
}
</style>
