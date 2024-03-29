export default function useVisibilityTracking(
  elementRef,
  onVisible,
  onNotVisible,
  options?: { root?: HTMLElement, rootMargin?: string, threshold?: number | number[] },
) {
  const componentIsVisible = ref()
  options = {}
  options.threshold = options.threshold ?? [1.0]

  if (!process.server) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && componentIsVisible.value !== true) {
          componentIsVisible.value = true
          onVisible()
        }
        else if (!entry.isIntersecting && componentIsVisible.value !== false) {
          componentIsVisible.value = false
          onNotVisible()
        }
      })
    }, options)

    onMounted(() => {
      observer.observe(elementRef.value)
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  }
}
