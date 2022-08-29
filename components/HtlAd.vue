<script setup lang="ts">
defineProps<{
    slot: string
    layout: string
}>()

const sensitiveContent = useSensitiveContent()
</script>

<template>
<div :class="`ad-wrapper ${layout}`">
    <div v-if="sensitiveContent" :class="slot"></div>
</div>

</template>
<style lang="scss">
.ad-wrapper.leaderboard {
    min-width: 300px;
    min-height: 50px;
    @include media('>sm') {
        min-width: 728px;
        min-height: 90px;
    }
}

.ad-wrapper.wide {
    min-width: 300px;
    min-height: 250px;
    @include media('>sm') {
        min-width: 728px;
        min-height: 90px;
    }
}

.ad-wrapper.rectangle {
    min-width: 300px;
    min-height: 250px;
}

</style>