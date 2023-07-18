<script setup lang="ts">
const { data: weather, pending, error } = await useFetch(`/api/weather`, {server: false})
</script>
<template>
  <div class="weather-widget">
    <div v-if="!pending && !error && weather">
      <i aria-hidden="true" class="wi" :class="weather.iconName"></i>
      <span class="sr-only">Current Conditions In NYC: {{weather.textDescription}}. Current Temperature:</span> {{weather.temperature}}°
    </div>
  </div>
</template>