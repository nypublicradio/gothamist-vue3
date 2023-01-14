<script setup lang="ts">
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import { FactboxBlock } from '../../composables/types/StreamfieldBlock'
const props = defineProps<{
  block: FactboxBlock
}>()
const image = props.block.value.image.image
const caption = props.block.value.image.caption
</script>

<template>
  <aside class="factbox">
    <h4>{{ block.value.heading }}</h4>
    <v-image-with-caption
      v-if="image"
      class="mb-7 factbox-image-wrapper"
      :image="useImageUrl(image)"
      :alt-text="image.alt"
      :width="320"
      :height="214"
      :maxWidth="image.width"
      :maxHeight="image.height"
      :description="caption || image.caption"
      :credit="image.credit"
      :credit-url="image.creditLink"
      :sizes="[2]"
      :ratio="[4,3]"
    />
    <div v-for="bodyBlock of block.value.body" :key="bodyBlock.id">
      <div
        v-if="bodyBlock.type === 'text'"
        :key="`${bodyBlock.id}-text`"
        v-html="bodyBlock.value"
        class="factbox-body-text"
      />
      <table
        v-else-if="bodyBlock.type === 'custom_list'"
        v-for="listItem of bodyBlock.value"
        :key="listItem.listItemLabel"
        class="factbox-body-table"
      >
        <tr>
          <th>{{ listItem.listItemLabel }}</th>
          <tr v-html="listItem.listItemText" />
        </tr>
      </table>
    </div>
  </aside>
</template>

<style lang="scss">
.factbox {
  max-width: 320px;
}
</style>
