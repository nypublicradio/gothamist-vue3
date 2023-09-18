export default function useVisibilityTracking(elementRef, onVisible, onNotVisible, options={threshold: [1.0]}) {
  const componentIsVisible = ref()

  if (!process.server) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && componentIsVisible.value !== true) {
          componentIsVisible.value = true
          onVisible()
        } else if (!entry.isIntersecting && componentIsVisible.value !== false) {
          componentIsVisible.value = false
          onNotVisible()
        }
      })
    }, options);

    onMounted(() => { 
      observer.observe(elementRef.value)
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  }
}
