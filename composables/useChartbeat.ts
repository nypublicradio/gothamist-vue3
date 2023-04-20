import { nextTick } from 'vue'
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

  const observer = new MutationObserver(function(mutations) {
    updatePage()
  })

  onMounted(() => {
    observer.observe(
      document.querySelector('title'),
      { subtree: true, characterData: true, childList: true }
    );
    
  })
  onUnmounted(() => {
    observer.disconnect();
  })
}
