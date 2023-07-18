<script setup lang="ts">
const { data: weather, pending, error } = await useFetch(`/api/weather`, {server: false})
</script>
<template>
  <div class="weather-widget">
    <div v-if="!pending && !error && weather">
      <i aria-hidden="true" class="wi" :class="weather.iconName"></i>
      <span class="sr-only">Current Conditions In NYC: {{weather.textDescription}}.</span>
      <span v-if="weather.temperature"><span class="sr-only">Current Temperature:</span> {{weather.temperature}}°F</span>
    </div>
  </div>
</template>