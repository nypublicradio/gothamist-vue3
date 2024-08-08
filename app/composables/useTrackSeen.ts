export default function useTrackSeen(elementRef, callback) {
  const options = {
    threshold: [0.0, 0.75],
  }

  const intersectionCallback = (entries, thisObserver) => {
    if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.75)) {
      thisObserver.disconnect() // only run this once
      callback()
    }
  }

  let observer

  onMounted(() => {
    observer = new IntersectionObserver(intersectionCallback, options)
    if (elementRef.value)
      observer.observe(elementRef.value)
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })
}
