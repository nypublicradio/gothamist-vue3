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
    <h3 class="factbox-heading">{{ block.value.heading }}</h3>
    <v-image-with-caption
      v-if="image"
      class="factbox-image-wrapper mb-3"
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
    <div class="factbox-body">
      <div v-for="bodyBlock of block.value.body" :key="bodyBlock.id">
        <div
          v-if="bodyBlock.type === 'text'"
          :key="`${bodyBlock.id}-text`"
          v-html="bodyBlock.value"
          class="factbox-body-text"
        />
        <table
          v-else-if="bodyBlock.type === 'custom_list'"
          class="factbox-body-table"
        >
          <tr
            v-for="listItem of bodyBlock.value"
            :key="listItem.listItemLabel"
          >
            <th>{{ listItem.listItemLabel }}</th>
            <td v-html="listItem.listItemText" />
          </tr>
        </table>
      </div>
    </div>
  </aside>
</template>

<style lang="scss">

.page.sectionSlug-articleSlug .article-body > .factbox {
  margin: 24px 0;
  padding: 20px 0;
  border-top: 1px solid #000000;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
@include media('>=lg') {
  .page.sectionSlug-articleSlug .article-body {
    position: relative;
  }
  .page.sectionSlug-articleSlug .article-body > .factbox {
    position: absolute;
    max-width: 320px;
    right: 0;
    top: 0;
    border-bottom: none;
  }
}

.factbox-heading {
  padding: 0 0 12px;
  font-size: var(--font-size-6);
  line-height: 1;
}

.factbox-heading + .factbox-body {
  border-top: 1px solid rgba(0,0,0,0.2);
}

.factbox-body-text * {
  font-family: var(--font-family-header);
  font-size: var(--font-size-5);
}

.factbox-body-text ul, .factbox-body-text ol {
  margin-bottom: 1rem;
}

.factbox-body-text li {
  padding: 0;
  line-height: 1.4;
}

.factbox-body-table {
  width: 100%;
  border-spacing: 2rem 0;
}

.factbox-body-table tr  {
  background: none !important;
  border: none !important;
}

.factbox-body-table tr th, .factbox-body-table tr td {
  vertical-align: top;
  text-align: left;
  font-size: var(--font-size-5);
  line-height: 1.4;
  padding: 0;
}

.factbox-body-table tr th {
  padding: 0;
  text-transform: none;
  font-weight: 700;
}

.factbox-body-table tr:not(:last-child) > td {
  padding-bottom: 1rem;
}

.factbox-body-table tr td, .factbox-body-table tr td p {
  font-family: var(--font-family-header);
  font-size: var(--font-size-5);
  line-height: 1.4;
  text-transform: none;
  font-weight: 400;
}

</style>