<script setup lang="ts">
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import { FactboxBlock } from '../../composables/types/StreamfieldBlock'
const props = defineProps<{
  block: FactboxBlock
}>()
</script>

<template>
  <aside class="factbox">
    <h3 class="factbox-heading">{{ block.value.heading }}</h3>
    <v-image-with-caption
      v-if="block.value.image.image"
      class="factbox-image-wrapper mb-3"
      :image="useImageUrl(block.value.image.image)"
      :alt-text="block.value.image.image.alt"
      :width="320"
      :height="214"
      :maxWidth="block.value.image.image.width"
      :maxHeight="block.value.image.image.height"
      :description="block.value.image.caption || block.value.image.image.caption"
      :credit="block.value.image.image.credit"
      :credit-url="block.value.image.image.creditLink"
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
          <tbody>
            <tr
              v-for="listItem of bodyBlock.value"
              :key="listItem.listItemLabel"
            >
              <th>{{ listItem.listItemLabel }}</th>
              <td v-html="listItem.listItemText" />
            </tr>
          </tbody>
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
  letter-spacing: -0.02em;
}

.factbox-heading + .factbox-body {
  border-top: 1px solid rgba(0,0,0,0.2);
  padding-top: 10px;
}

.factbox-body-text * {
  font-family: var(--font-family-header);
  font-size: var(--font-size-5);
  line-height: 1.4;
}

.factbox-body-text p {
  margin-bottom: 1rem;
}

.factbox-body-text ul, .factbox-body-text ol {
  margin-bottom: 1rem;
}
.factbox-body-text ul li {
  padding: 0;
  line-height: 1.4;
}
.factbox-body-text ul li:not(:last-child) {
  padding-bottom: 0.5rem;
}

.factbox-body-text ol {
  counter-reset: item;
  padding-left: 0;
}
.factbox-body-text ol li {
  position: relative;
  display: block;
  padding-left: 1.4rem;
}
.factbox-body-text ol li:not(:last-child) {
  padding-bottom: 0.5rem;
}
.factbox-body-text ol li:before {
  position: absolute;
  content: counter(item) ". ";
  counter-increment: item;
  font-weight: 800;
  left: 0;
  width: 1.5rem;
  display: inline-block;
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