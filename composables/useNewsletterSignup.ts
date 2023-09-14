import type { MaybeRefOrGetter } from 'vue'

export default function useNewsletterSignup(options: {
  email: MaybeRefOrGetter<string>,
  selectedLists: MaybeRefOrGetter<string[]>,
  additionalLists?: MaybeRefOrGetter<string[]>,
  consent: MaybeRefOrGetter<boolean>,
  source: MaybeRefOrGetter<string>,
}) {

options.additionalLists = options.additionalLists ?? []
const { $sentry } = useNuxtApp()
const config = useRuntimeConfig()

const isSubmitting = ref(false)
const isError = ref(false)
const isSuccess = ref(false)

const isValidEmail = (email:string) => {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
  const emailMatcher = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailMatcher.test(email)
}
const isFormValid = computed(() => {
  return isValidEmail(toValue(options.email)) &&
  toValue(options.selectedLists).length > 0 &&
  toValue(options.consent) === true
})
const submitForm = (event=new Event('')) => {
  if (!isFormValid) {
    return event.preventDefault()
  }
  isError.value = false
  isSuccess.value = false
  isSubmitting.value = true
  $fetch(config.public.NEWSLETTER_API, {
    method: 'POST',
    body: {
      source: toValue(options.source),
      list: [...toValue(options.selectedLists), ...toValue(options.additionalLists)].join('++'),
      email: toValue(options.email)
    },
  })
  .then(() => {
    isSuccess.value = true
    isSubmitting.value = false
    const maxAge = 60 * 60 * 24 * 30 * 12 // about 12 months
    const cookie = useCookie('__gothamistNewsletterMember', { path: '/', maxAge})
    cookie.value = 'true'
  })
  .catch((error) => {
    isError.value = true
    isSubmitting.value = false
    $sentry.captureException(error.response)
  })
  return event.preventDefault()
}
return {
    submitForm,
    isSubmitting,
    isError,
    isSuccess,
    isFormValid
  }
}