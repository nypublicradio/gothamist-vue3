export default function useNewsletterSignup(options: {
  email: Ref<string>,
  selectedLists: Ref<string[]>,
  additionalLists?: Ref<string[]>,
  consent: Ref<boolean>,
  source: string,
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
  return isValidEmail(options.email.value) &&
  options.selectedLists.value.length > 0 &&
  options.consent.value === true
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
      source: options.source,
      list: [...options.selectedLists.value, ...options.additionalLists.value].join('++'),
      email: options.email.value
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