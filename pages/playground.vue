<script setup lang="ts">
  const weather = await useFetch(`/api/weather`)
  .then(({ data }) => data)
</script>
<template>
  <div v-if="weather">
    <div>
      <i class="wi" :class="weather.iconName"></i> {{weather.temperature}}°
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>



