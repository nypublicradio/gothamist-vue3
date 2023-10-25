<template>
  <div class="boroughs p-4 xl:p-6 pb-6 xl:pb-8" data-style-mode="dark">
    <div class="boroughs-header mb-5 xl:mb-7 py-2">
      WNYC Presents
    </div>
    <div class="boroughs-content">
      We cover stories that make New York work for New Yorkers. Browse
      <NuxtLink to="/tags/manhattan">
        <div class="tag-large">
          Manhattan
        </div>
      </NuxtLink>
      <NuxtLink to="/tags/brooklyn">
        <div class="tag-large">
          Brooklyn
        </div>
      </NuxtLink>
      <NuxtLink to="/tags/the-bronx">
        <div class="tag-large">
          The Bronx
        </div>
      </NuxtLink>
      <NuxtLink to="/tags/staten-island">
        <div class="tag-large">
          Staten Island
        </div>
      </NuxtLink>
      <NuxtLink to="/tags/queens">
        <div class="tag-large">
          Queens
        </div>
      </NuxtLink>
      <NuxtLink to="/tags/new-jersey">
        <div class="tag-large">
          New Jersey
        </div>
      </NuxtLink>
    </div>
    <div class="boroughs-footer mt-4 xl:mt-5">
      ♥
      <a
        href="https://pledge.wnyc.org/support/gothamist/?utm_medium=partnersite&utm_source=gothamist&utm_campaign=homepage-brand-moment"
        target="_blank"
        rel="noopener"
      >
        Support our local coverage
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.boroughs {
  width: 100%;
  background: var(--black);
  text-align: center;
  font-size: var(--font-size-10);
  line-height: var(--font-size-10);
  color: var(--white);
  font-family: var(--font-family-header);
  font-weight: 600;
  @include media('>lg') {
    font-size: var(--font-size-17);
    line-height: var(--font-size-17);
  }
}
.boroughs .tag-large {
  margin: 0.25rem 0.15rem 0.25rem 0.25rem;
  text-decoration: none;
  display: inline-block;
  width: fit-content;
  font-weight: 600;
  @include media('>lg') {
    margin: 0 0.25rem 0.5rem;
    display: inline-block;
  }
}
.boroughs .boroughs-header {
  font-size: var(--font-size-5);
  line-height: var(--font-size-5);
  font-weight: 400;
  text-transform: uppercase;
  text-align: left;
  border-top: solid 1px var(--white);
  @include media('>lg') {
    font-size: var(--font-size-6);
    line-height: var(--font-size-6);
  }
}
.boroughs .boroughs-content {
  width: 1150px;
  max-width: 100%;
  margin: auto;
  a:focus > div, a:hover > div {
    text-decoration: var(--link-hover-text-decoration);
  }
}
.boroughs .boroughs-footer {
  font-size: var(--font-size-5);
  line-height: var(--font-size-6);
  font-weight: 400;
}
.boroughs .boroughs-footer a {
  font-weight: 400;
  text-decoration: underline;
}
</style>
