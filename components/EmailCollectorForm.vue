<script setup lang="ts">
const props = defineProps({
  showNoThanks: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
  altDesign: {
    type: Boolean,
    default: false,
  },
  submissionStatus: {
    type: String,
    default: null,
  },
  submitButtonText: {
    type: String,
    default: 'Sign up',
  },
  submitButtonIcon: {
    type: String,
    default: null,
  },
  thanksMessage: {
    type: String,
    default: 'Thank you for signing up!',
  },
})

const emit = defineEmits<{
  (e: 'submit', value: any): void
  (e: 'noThanksClick'): void
}>()

const email = ref('')
const checked = ref(true)
const submitButtonRef = ref(null)
const submitButtonWidth = ref(40)
const emailErrorText = ref(null)
onMounted(() => {
  // for some reason the submit button is not always rendered when the component is mounted coming from a route transition, so I have to add a slight delay to make sure it gets access to the button.
  // this is a known bug: https://github.com/nuxt/framework/issues/3587
  setTimeout(() => {
    // gets the width of the submit button to set the padding right on the input field
    submitButtonWidth.value = submitButtonRef.value.offsetWidth + 20
  }, 500)
})

// function to check if the email is a valid format and to set the error text
function validateEmail() {
  // See also isValidEmail in useNewsletterSignup.ts
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  emailErrorText.value = null
  if (validRegex.test(email.value)) {
    return true
  }
  else {
    emailErrorText.value = 'Please enter a valid email address.'
    return false
  }
}

// watches for changes in the submissionStatus prop and sets error messages accordingly
watch(
  () => props.submissionStatus,
  () => {
    emailErrorText.value = null
    switch (props.submissionStatus) {
      case 'success':
        break
      case 'error':
        emailErrorText.value
          = 'Sorry, there was an error with your submission. Please try again!'
        break
      default:
    }
  },
)

// submit the email value through the emit if the email is valid
function submitForm() {
  if (validateEmail())
    emit('submit', email.value)
}
</script>

<template>
  <div>
    <div class="email-collector-form">
      <!-- when the submissionStatus is 'success' it will hide the form and show Thank you message -->
      <span
        v-if="submissionStatus !== 'success'"
        class="flex flex-column lg:flex-row"
        style="gap: 1rem"
      >
        <div class="flex-grow-1">
          <span class="p-input-icon-right w-full">
            <i
              ref="submitButtonRef"
              class="submit-icon"
              :class="[
                { altDesignIcon: altDesign && submitButtonIcon },
              ]"
              :data-style-mode="dark ? 'dark' : 'default'"
            >
              <Button
                :disabled="isSubmitting || !checked"
                class="submit-btn p-button-rounded"
                :class="[{ 'p-button-outlined': outlined }]"
                :icon="submitButtonIcon ? `pi ${submitButtonIcon}` : null"
                icon-pos="right"
                :label="submitButtonIcon ? null : submitButtonText"
                :aria-label="submitButtonText"
                @click="submitForm"
              >
                <i v-if="isSubmitting" class="pi pi-spin pi-spinner" />
              </Button>
            </i>
            <span class="field">
              <label :class="emailErrorText ? 'p-error' : ''" for="email">Email address</label>
              <InputText
                v-model="email"
                :disabled="isSubmitting"
                class="w-full p-inputtext-lg"
                :class="[
                  { 'p-invalid': emailErrorText },
                  { 'alt-design': altDesign },
                  { dark },
                ]"
                :style="`padding-right: ${submitButtonWidth}px`"
                type="email"
                placeholder="your@email.com"
                aria-label="sign up"
                aria-describedby="email-address-field"
                autocomplete="email"
                name="email"
                @keypress.enter="submitForm"
              />
            </span>
          </span>
          <Transition name="fade">
            <small
              v-if="emailErrorText"
              id="email-address-field"
              class="p-error mt-1 block"
            >{{ emailErrorText }}</small>
          </Transition>
          <div class="field-checkbox mt-3 mb-0">
            <Checkbox
              v-model="checked"
              aria-label="Toggle agreement to the terms"
              :disabled="isSubmitting"
              :binary="true"
              @click="!checked"
            />
            <label for="binary"><slot /></label>
          </div>
        </div>
        <div v-if="showNoThanks" class="flex justify-content-start">
          <div>
            <Button
              class="no-thanks-btn p-button-link"
              label="No thanks"
              :style="isSubmitting ? 'visibility: hidden' : ''"
              @click="emit('noThanksClick')"
            />
          </div>
        </div>
      </span>
      <p v-else class="type-paragraph3">
        {{ thanksMessage }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.email-collector-form .p-input-icon-right {
  .submit-icon {
    .p-button {
      min-height: 41px;
      min-width: 41px;
      padding: 0px 16px;
    }
    &.altDesignIcon {
      margin-top: 0;
      .p-button {
        padding: 0;
        min-height: unset;
        min-width: unset;
        border-radius: 20px;
        height: 1.4rem;
        width: 2rem;
        .pi {
          font-size: 0.75rem;
        }
      }
    }
  }
  .p-inputtext {
    padding-right: 100px;
  }
}

.email-collector-form .pi-spinner {
  font-size: 1.25rem;
  color: var(--black);
  margin: auto;
}
.email-collector-form .no-thanks-btn {
  margin-left: -1rem;
  width: 110px;
  margin-top: 8px;
  text-decoration: underline;
  @include media('<md') {
    margin-top: -1rem;
  }
}
.email-collector-form {
  .field-checkbox {
    .p-checkbox {
      align-self: flex-start;
    }
    label {
      @include font-config($type-fineprint);
    }
  }
  .p-error {
    text-align: right;
  }
}
</style>
