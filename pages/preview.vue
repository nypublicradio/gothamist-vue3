<script setup lang="ts">
import { transformResponseData } from '~~/composables/useAviary'
import { normalizeFindPageResponse } from '~~/composables/data'
import { ArticlePage } from '~~/composables/types/Page'

import { usePreviewData } from '~/composables/states'
const config = useRuntimeConfig()

const route = useRoute()
const router = useRouter()
const previewData = usePreviewData()

//const emit = defineEmits(["change", "click"]);
const identifier = route.query.identifier
const identifierId = identifier.slice(3)
const token = route.query.token

console.log('route = ', route)
console.log('identifier = ', identifier)
console.log('token = ', token)

const handlePreviewData = async () => {
  const { data, error } = useFetch(
    `${config.API_URL}/page_preview/?identifier=${identifier}&token=${token}`
  )
  const transformedData = transformResponseData(data)
  const normalizedDataData = normalizeFindPageResponse(
    transformedData
  ) as ArticlePage
  previewData.value = { data: normalizedDataData, error }
  console.log('previewData.value = ', previewData.value)
  router.push(
    `/${previewData.value.data.section.slug}/${identifierId}?preview=true`
  )
}

// lifecycle hooks
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
