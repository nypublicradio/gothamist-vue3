<script setup lang="ts">
import { transformResponseData } from '~~/composables/useAviary'
import { normalizeFindPageResponse } from '~~/composables/data'
import { ArticlePage, GalleryPage } from '~~/composables/types/Page'
import { usePreviewData } from '~/composables/states'

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const previewData = usePreviewData()

const identifier = route.query.identifier
const identifierId = identifier.slice(3)
const token = route.query.token

const formatData = (data) => {
  const transformedData = transformResponseData(data)
  const normalizedData = normalizeFindPageResponse(
    transformedData
  ) as ArticlePage
  return normalizedData
}

const handlePreviewData = async () => {
  useFetch(
    `${config.API_URL}/page_preview/?identifier=${identifier}&token=${token}`
  ).then((res) => {
    //console.log('res.data = ', res.data)
    switch (res.data.value.meta.type) {
      case 'news.ArticlePage':
        previewData.value = { data: formatData(res.data), error: res.error }
        //console.log('previewData.value = ', previewData.value)
        setTimeout(() => {
          router.push(
            `/${previewData.value.data.section.slug}/${identifierId}?preview=true`
          )
        }, 1500)
        break
      case 'tagpages.TagPage':
        break
      case 'standardpages.InformationPage':
        break
      default:
        break
    }
  })
}

handlePreviewData()
</script>

<template>
  <div>
    <div class="preview text-center bold py-8 text-5xl">
      <i
        class="pi pi-spin pi-spinner lnline-block mr-3"
        style="font-size: 2rem"
      ></i>
      <h3 class="inline-block">Building preview...</h3>
    </div>
  </div>
</template>

<style lang="scss">
.preview {
}
</style>
