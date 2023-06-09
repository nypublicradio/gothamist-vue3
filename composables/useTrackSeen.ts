export default function useTrackSeen(elementRef, callback) {
  const options = {
    threshold: 1.0,
  };
  
  const observer = new IntersectionObserver(callback, options);

  onMounted(() => {
    observer.observe(elementRef.value)
  })

  onBeforeUnmount(() => {
    observer.disconnect
  })

}