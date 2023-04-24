export default function useChartbeat(pageInfo = {}) {
  const { $chartbeat } = useNuxtApp()
  const updatePage = () => {
    const defaultPageInfo = {
      path: document.location.pathname,
      title: document.title,
      authors: '',
      tags: '',
    }
    const info = Object.assign({}, defaultPageInfo, pageInfo)
    $chartbeat.updatePage(info)
  }

  let observer:MutationObserver

  onMounted(() => {
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
