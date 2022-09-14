<script setup lang="ts">
defineProps<{
    slot: string
    layout: string
    fineprint?: string
    fineprintClass?: string
}>()

const sensitiveContent = useSensitiveContent()
</script>

<template>
    <div>
        <div :class="`ad-wrapper ${sensitiveContent ? '' : layout}`">
            <div v-if="!sensitiveContent" :class="slot"></div>
        </div>
        <p v-if="fineprint && !sensitiveContent" :class="`type-fineprint ${fineprintClass || ''}`">{{fineprint}}</p>
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