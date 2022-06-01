<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRuntimeConfig } from '#app'

  const config = useRuntimeConfig()
  const route = useRoute()
  const atTop = ref(true)
  const navigation =  await findNavigation()
    .then(({data}) => normalizeFindNavigationResponse(data))
  const breakingNews = await findBreakingNews()
    .then(({data}) => normalizeFindBreakingNewsResponse(data))
  const productBanners = await findProductBanners()
    .then(({data}) => normalizeFindProductBannersResponse(data))

  onMounted(() => {
    document.addEventListener('scroll', (e) => {
      atTop.value = window.scrollY > 0 ? false : true
      //atBottom.value = ((window.scrollY + (window.innerHeight + 115) >= document.body.scrollHeight)) ? true : false
    })
    // Ads
    window.htlbid = window.htlbid || {}
    htlbid.cmd = htlbid.cmd || []
    htlbid.cmd.push(function () {
      htlbid.layout('universal') // Leave as 'universal' or add custom layout
      htlbid.setTargeting('is_testing', config.HTL_IS_TESTING) // Set to "no" for production
      htlbid.setTargeting('is_home', route.name === 'index' ? 'yes' : 'no') // Set to "yes" on the homepage
      htlbid.setTargeting('category', route.name) // dynamically pass page category into this function
      htlbid.setTargeting('post_id', route.name) // dynamically pass unique post/page id into this function
    })
  })
</script>

<template>
  <div
    class="page"
    :class="[`${String(route.name)}`]"
  >
    <Html lang="en">
      <Head>
        <Link rel="preconnect" :href="config.API_URL" />
        <Link rel="stylesheet" :href="config.HTL_CSS" type="text/css" />
        <Script :src="config.HTL_JS" async />
        <Title>Gothamist: New York City Local News, Food, Arts & Events</Title>
        <Meta name="description" content="Gothamist is a website about New York City news, arts and events, and food, brought to you by New York Public Radio." />
        <Meta name="og:site_name" content="Gothamist: New York City Local News, Food, Arts & Events" />
        <Meta name="og:type" content="website" />
        <Meta
          name="og:url"
          :content="`https://www.gothamist.com${route.fullPath}`"
        />
        <Meta
          name="og:title"
          content="Gothamist is a website about New York City news, arts and events, and food, brought to you by New York Public Radio."
        />
        <Meta name="og:description" content="Investigating a strange world." />
        <Meta
          name="og:image"
          content="https://gothamist.com/static-images/home_og_1200x650.png"
        />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:image:width" content="1200" />
        <Meta name="og:image:height" content="650" />
        <Meta name="fb:app_id" content="151261804904925" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:site" content="@gothamist" />
      </Head>
    </Html>
    <header>
      <h1><NuxtLink to="/">Gothamist</NuxtLink></h1>
      <!-- Header -->
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <i>footer</i>
      <!-- Footer -->
    </footer>
  </div>
</template>

<style lang="scss">
body,
html {
  overflow-y: auto;
  overflow-x: hidden;
}

main {
  padding-top: var(--header-height);
}
</style>
