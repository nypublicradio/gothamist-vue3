<script setup lang="ts">
import { CodeBlock, EmbedBlock } from '../../composables/types/StreamfieldBlock'
const props = defineProps<{
  block: CodeBlock
}>()

// code blocks and embed blocks are both just blocks
// of html and they're sometime used interchangably for things
// in the CMS, so we're making this a proxy for the embed block
// so we don't need to handle special cases (like twitter embeds)
// in two places
// Yes, this is kind of a hack
const embedBlock: EmbedBlock = {
  id: props.block.id,
  type: 'embed',
  value: {
    embed: props.block.value.code
  }
}
</script>

<template>
  <StreamfieldEmbed :block="embedBlock" />
</template>

