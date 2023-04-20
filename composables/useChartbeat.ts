export default function   (pageInfo = {}) {
  const { $chartbeat } = useNuxtApp()
  const updatePage = () => {
    const defaultPageInfo = {
      path: document.location.pathname,
      title: document.title,
      authors: '',
      section: '',
    }
    const info = Object.assign({}, defaultPageInfo, pageInfo)
    $chartbeat.updatePage(info)
  }

  let observer:MutationObserver

  onMounted(function() {
    observer = new MutationObserver(updatePage)
    if (!process.server) {
      observer.observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
      );
    }
  })

  onUnmounted(() => {
    observer.disconnect();
  })
}
