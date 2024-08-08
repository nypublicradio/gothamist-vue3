<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
defineProps<{
  quote: string
  author?: string
}>()
</script>

<template>
  <blockquote class="streamfield-pull-quote pt-4 pb-3" v-bind="{ ...$attrs }">
    <div class="h3">
      {{ quote }}
    </div>
  </blockquote>
  <span v-if="author" class="streamfield-pull-quote-author pb-4 mb-5">
    {{ author }}
  </span>
</template>

<style lang="scss">
.streamfield-pull-quote {
  border-top: solid 1px var(--black);
  position: relative;
  &::before {
    content: url("data:image/svg+xml,%0A%3Csvg width='11' height='9' viewBox='0 0 11 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.35429 4.16047C3.84883 4.26797 4.22511 4.51524 4.48313 4.90226C4.76266 5.28928 4.90242 5.7623 4.90242 6.32133C4.90242 7.05237 4.67665 7.64365 4.22511 8.09517C3.79507 8.5467 3.21452 8.77246 2.48346 8.77246C1.7524 8.77246 1.15035 8.5467 0.677308 8.09517C0.225769 7.62215 0 7.04162 0 6.35358C0 5.68705 0.215018 4.97751 0.645055 4.22497L3.09626 0H4.90242L3.35429 4.16047ZM5.99901 6.35358C5.99901 5.68705 6.21403 4.97751 6.64407 4.22497L9.09527 0H10.9014L9.3533 4.16047C9.84784 4.26797 10.2241 4.51524 10.4821 4.90226C10.7617 5.28928 10.9014 5.7623 10.9014 6.32133C10.9014 7.05237 10.6757 7.64365 10.2241 8.09517C9.79408 8.5467 9.21353 8.77246 8.48247 8.77246C7.75141 8.77246 7.14936 8.5467 6.67632 8.09517C6.22478 7.62215 5.99901 7.04162 5.99901 6.35358Z' fill='%23111111'/%3E%3C/svg%3E%0A");
    display: block;
    padding: 9px 14px 11px;
    border: solid 1px var(--text-color);
    border-radius: 50%;
    float: left;
    margin-right: 10px;
  }
}
.streamfield-pull-quote-author {
  display: block;
  border-bottom: solid 1px var(--gray-100);
  font-size: var(--font-size-5);
}
</style>
