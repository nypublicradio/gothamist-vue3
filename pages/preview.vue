<script setup>
import { ref, computed, onMounted } from 'vue'
import { transformResponseData } from '~~/composables/useAviary'
import { normalizeFindPageResponse } from '~~/composables/data'

import { usePreviewData } from '~/composables/states'
const config = useRuntimeConfig()
const props = defineProps({
  //   propVar: {
  //     type: Boolean,
  //     default: false,
  //   },
})

const route = useRoute()
const previewData = usePreviewData()

//const emit = defineEmits(["change", "click"]);

///page_preview/?identifier=${route.query.identifier}&token=${route.query.token}

//https://cms.demo.nypr.digital/preview?identifier=id%3D151233&token=0ab8874a-0c44-4a6a-b566-fc5f71cf2e34

const identifier = route.query.identifier
const token = route.query.token

console.log('route = ', route)
console.log('identifier = ', identifier)
console.log('token = ', token)

const handlePreviewData = async () => {
  const { data, error } = useFetch(
    `${config.API_URL}/page_preview/?identifier=${identifier}&token=${token}`
  )
  // DONT FORGET TO NORMALIZE THE DATA
  const transformedData = transformResponseData(data)
  const normalizedDataData = normalizeFindPageResponse(transformedData)
  previewData.value = { data: transformedData, error }
  console.log('previewData.value = ', previewData.value)
  //console.log('previewData.value = ', previewData.value)
}

// lifecycle hooks
handlePreviewData()
onMounted(() => {})
</script>

<template>
  <div>
    <div class="preview">Preview page</div>
  </div>
</template>

<style lang="scss">
.preview {
}
</style>
