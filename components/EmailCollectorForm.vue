<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  showNoThanks: {
    type: Boolean,
    default: false,
  },
  isSubmiting: {
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
  (e: 'submitFormEmit', value: any): void
  (e: 'noThanksEventEmit'): void
}>()

const email = ref('')
const checked = ref(true)
const submitButtonRef = ref(null)
const submitBtnWidth = ref(100)
const inputTextRef = ref(null)

onMounted(() => {
  //gets the width of the submit button to set the padding right on the input field
  submitBtnWidth.value = submitButtonRef.value.offsetWidth + 20
})

// submit the email value through the emit
function submitForm() {
  emit('submitFormEmit', email.value)
}
</script>

<template>
  <div class="email-collector-form">
    <span
      v-if="props.submissionStatus !== 'success'"
      class="flex flex-column lg:flex-row"
      style="gap: 1rem"
    >
      <div class="flex-grow-1">
        <span class="p-input-icon-right w-full">
          <i
            ref="submitButtonRef"
            class="submit-icon"
            :class="[{ altDesign: props.altDesign && props.submitButtonIcon }]"
            :data-style-mode="props.altDesign ? 'dark' : 'default'"
          >
            <Button
              :disabled="props.isSubmiting || !checked"
              @click="submitForm"
              class="submit-btn p-button-rounded"
              :icon="submitButtonIcon ? `pi ${submitButtonIcon}` : null"
              iconPos="right"
              :label="submitButtonIcon ? null : props.submitButtonText"
            >
              <i v-if="props.isSubmiting" class="pi pi-spin pi-spinner" />
            </Button>
          </i>
          <InputText
            ref="inputTextRef"
            :disabled="props.isSubmiting"
            class="w-full p-inputtext-lg"
            :class="[
              { 'p-invalid': props.submissionStatus === 'error' },
              { 'alt-design': props.altDesign },
            ]"
            :style="`padding-right: ${submitBtnWidth}px`"
            type="email"
            placeholder="your@email.com"
            aria-describedby="email-address-field"
            v-model="email"
            autocomplete="email"
            name="email"
            @keypress.enter="submitForm"
          />
        </span>
        <small
          v-if="props.submissionStatus === 'error'"
          id="email-address-field"
          class="p-error mt-1 block"
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
      <div v-if="props.showNoThanks" class="flex justify-content-start">
        <div>
          <Button
            @click="emit('noThanksEventEmit')"
            class="no-thanks-btn p-button-link"
            label="No thanks"
            :style="props.isSubmiting ? 'visibility: hidden' : ''"
          >
          </Button>
        </div>
      </div>
    </span>
    <p v-else class="type-paragraph3">{{ props.thanksMessage }}</p>
  </div>
</template>

<style lang="scss">
.email-collector-form .p-input-icon-right {
  .submit-icon {
    margin-top: -1.3rem;
    .p-button {
      min-height: 41px;
      min-width: 41px;
    }
    &.altDesign {
      margin-top: -0.85rem;
      .p-button {
        min-height: unset;
        min-width: unset;
        border-radius: 20px;
        height: 1.75rem;
        width: 2.5rem;
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
