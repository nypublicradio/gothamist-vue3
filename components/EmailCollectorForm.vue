<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  showNoThanks: {
    type: Boolean,
    default: false,
  },
  isSubmiting: {
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
          <i class="submit-icon">
            <Button
              :disabled="props.isSubmiting || !checked"
              @click="submitForm"
              class="submit-btn p-button-rounded"
              :label="props.submitButtonText"
            >
              <i v-if="props.isSubmiting" class="pi pi-spin pi-spinner" />
            </Button>
          </i>
          <InputText
            :disabled="props.isSubmiting"
            class="w-full p-inputtext-lg"
            :class="[{ 'p-invalid': props.submissionStatus === 'error' }]"
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
    margin-top: -1.25rem;
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
