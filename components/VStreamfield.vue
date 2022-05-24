<script setup lang="ts">
import { StreamfieldBlock } from '~~/composables/data/types';
defineProps<{
  streamfield: StreamfieldBlock[]
}>()

const blocksMounted = ref(0)

function countMountedBlock() {
  blocksMounted.value++
}
</script>

<template>
  <div class="streamfield">
    <template v-for="block in streamfield">
      <!-- block-quote -->
      <div
        v-if="block.type === 'block_quote'"
        :key="`${block.id}-block-quote`"
        class="streamfield-block-quote"
      >
        <blockquote>
          <p>
            {{ block.value.blockQuote }}
          </p>
        </blockquote>
      </div>

      <!-- code -->
      <html-fragment
        v-else-if="block.type === 'code'"
        :key="`${block.id}-code`"
        class="streamfield-code u-spacing"
        :html="block.value.code"
        @hook:mounted="countMountedBlock"
      />

      <!-- content collection -->
      <div
        v-else-if="block.type === 'content_collection'"
        :key="`${block.id}-content-collection`"
        class="streamfield-content-collection"
      >
        <!--  -->
      </div>

      <!-- embed -->
      <div
        v-else-if="block.type === 'embed'"
        :key="`${block.id}-embed`"
        class="streamfield-embed"
        v-html="block.value.embed"
      />

      <!-- heading -->
      <div
        v-else-if="block.type === 'heading'"
        :key="`${block.id}-heading`"
        class="streamfield-heading"
      >
        <h3>{{ block.value }}</h3>
      </div>

      <!-- image -->
      <div
        v-else-if="block.type === 'image'"
        :key="`${block.id}-image`"
        class="streamfield-image"
      >
      [image {{block.value}}]
      </div>

      <!-- paragraph -->
      <html-fragment
        v-else-if="block.type === 'paragraph'"
        :key="block.id"
        class="streamfield-paragraph u-spacing"
        :html="block.value"
        @hook:mounted="countMountedBlock"
      />

      <!-- pull-quote -->
      <div
        v-else-if="block.type === 'pull_quote'"
        :key="`${block.id}-pull-quote`"
        class="streamfield-pull-quote"
      >
        <pull-quote
          :quote="block.value.pullQuote"
          :author="block.value.attribution" 
          @hook:mounted="countMountedBlock"
        />
      </div>
    </template>
  </div>
</template>