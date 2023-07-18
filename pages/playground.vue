<script setup lang="ts">
  const weather = await useFetch(`/api/weather`)
  .then(({ data }) => data)
</script>
<template>
  <WeatherWidget></WeatherWidget>
</template>



