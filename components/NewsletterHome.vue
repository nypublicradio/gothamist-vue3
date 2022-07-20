<script setup>
import { ref, computed, onMounted } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const props = defineProps({
  //   propVar: {
  //     type: Boolean,
  //     default: false,
  //   },
})

//const emit = defineEmits(["change", "click"]);

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div class="newsletter-home grid grid-nogutter">
    <divider />

    <div class="col-12 lg:col-3 pr-3 pb-2">
      <h4>Never miss a story in your neighborhood</h4>
    </div>
    <div class="col-12 lg:col-8 xl:col-5 col-offset-0 xl:col-offset-1">
      <p class="type-paragraph2">
        Catch up on the most important headlines of the day with a roundup of
        essential NYC news, delivered to your inbox every day at 5pm.
      </p>
      <newsletter-form class="mt-2">
        By submitting your information, you're agreeing to receive
        communications from New York Public Radio in accordance with our
        <v-flexible-link to="/terms">Terms</v-flexible-link>.
      </newsletter-form>
    </div>
  </div>
</template>

<style lang="scss">
.newsletter-home {
  padding-bottom: 3rem;
  .p-divider {
    margin-bottom: 1.5rem;
    &:before {
      border-color: var(--black);
    }
  }
}
</style>
