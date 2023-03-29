<script setup lang="ts">
const newsletters = [
  {
    title: "Gothamist Daily",
    id: "Gothamist",
    description: "A daily roundup of the most important NYC headlines, delivered every day at 5pm"
  },{
    title: "We the Commuters",
    id: "We The Commuters",
    description: "Essential transportation coverage to your inbox every Thursday."
  }
]

const isSubmitting = ref(false)
const submissionStatus = ref<string>(null)

const selectedLists = ref<Array<string>>(newsletters.map(newsletter => newsletter.id))
const agree = ref(true)
const email = ref<string>(null)
const formIsValid = computed(() => {
  return selectedLists.value.length > 0 &&
  agree.value &&
  email.value
})

const submitForm = (event) => {
  if (!formIsValid.value) {
    return event.preventDefault()
  }
  isSubmitting.value = true
  submissionStatus.value = null
  submissionStatus.value = 'success'
  $fetch(config.NEWSLETTER_API, {
    method: 'POST',
    body: {
      source: 'gothamist',
      list: selectedLists.value.join('++'),
      email: email.value
    },
  })
  .then(() => {
    submissionStatus.value = 'success'
  })
  .catch(() => {
    submissionStatus.value = 'error'
    isSubmitting.value = false
  })
  return event.preventDefault()
}

</script>
<template>
    <div class="newsletter-page">
    <section>
      <div class="content">
        <form class="newsletter-form" v-on:submit="submitForm"
        >
          <h1>Newsletters</h1>
          <p>Get the news New Yorkers need in your inbox.</p>
          <div class="field">
            <label for="email"
              >Email address</label
            >
            <InputText
              class="w-full p-inputtext-lg"
              type="email"
              required="required"
              v-model="email"
              placeholder="your@email.com"
              aria-label="sign up"
              aria-describedby="email-address-field"
              autocomplete="email"
              name="email"
            />
          </div>
          <div class="newsletter-list">
            <div v-for="(newsletter, index) in newsletters" key="newsletter.id" class="newsletter-list-item">
              <div class="newsletter-checkbox">
                <Checkbox
                :id="`newsletter-${index}`"
                :value="newsletter.id"
                v-model="selectedLists"
              />
              </div>
              <div class="newsletter-info">
                <div><label :for="`newsletter-${index}`">{{newsletter.title}}</label></div>
                <div>{{newsletter.description}}</div>            
              </div>
            </div>
          </div>
          <div v-if="submissionStatus !== 'success'" class="newsletter-agree field-checkbox mt-3 mb-0">
            <Checkbox
              id="agree"
              role="checkbox"
              aria-label="Toggle agreement to the terms"
              :aria-checked="agree"
              v-model="agree"
              :disabled="isSubmitting"
              :binary="true"
            />
            <label for="agree">
              By submitting your information, you're agreeing to receive
              communications from New York Public Radio in accordance with our
              <a href="https://www.wnyc.org/terms/" target="_blank" rel="noopener noreferrer">Terms</a
              >.
            </label>
            <Button
              id="sign-up"
              :class="!formIsValid ? 'disabled' : ''"
              :aria-disabled="!formIsValid"
              :type="formIsValid ? 'submit' : 'button'"
              class="submit-btn p-button-rounded"
              label="Sign Up"
              aria-label="Sign Up"
            />
          </div>
          <div v-else class="newsletter-thanks mt-3 mb-0">Thank you for signing up!</div>
        </form>
        <div class="hero">
          <div class="phone">
            <div class="notch-container">
                  <div class="notch"></div>
            </div>
            <img src="/newsletter-preview.png" srcset="newsletter-preview@2x.png 2x, newsletter-preview@3x.png 3x" alt="">
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
.newsletter-agree, .newsletter-thanks {
  background: var(--soybean200);
  width: 100vw;
  min-height: 64px;
  padding: 10px;
  position: fixed;
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
  font-family: var(--font-family-header);
  font-size: var(--font-size-6);
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
  font-size: var(--font-size-6);
  letter-spacing: -.02em;
  line-height: var(--font-size-6);
}
.newsletter-info b {
  display: inline-block;
  margin-bottom: 4px;
}
.newsletter-page .hero {
  display: none;
  @include media('>lg') {
    display: flex;
    justify-content: center;
    .phone {
      height: 70vh;
      width: calc(70vh * 9/17);
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