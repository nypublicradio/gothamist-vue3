<script setup>
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>

<template>
  <section class="footer" data-style-mode="dark">
    <div class="content grid">
      <!-- <div class="grid"> -->
      <div class="hidden lg:flex col-4 p-0">
        <div class="menu-list">
          <VFlexibleLink to="https://sponsorship.wnyc.org/">
            Advertising
          </VFlexibleLink>
          <VFlexibleLink to="https://www.nypublicradio.org/support/">
            Support us
          </VFlexibleLink>
          <VFlexibleLink to="/contact"> Contact us </VFlexibleLink>
          <VFlexibleLink to="/feed"> RSS feed </VFlexibleLink>
          <VFlexibleLink
            to="https://www.nypublicradio.org/diversity-dei-overview/"
          >
            Diversity (DEI)
          </VFlexibleLink>
        </div>
      </div>
      <div class="col-12 lg:col-8 right p-0">
        <div class="logo-lockup">
          <img
            class="logo"
            src="/gothamist-logo-white.svg"
            alt="gothamist logo"
          />
          <div class="copy">
            Gothamist is a website about New York City news, arts, and events,
            and food, brought to you by New York Public Radio.
            <nuxt-link style="color: var(--soybean-500)" to="/support">
              Support us</nuxt-link
            >
          </div>
        </div>
        <div class="block lg:hidden">list-menu</div>
        <div class="logos flex">
          <a href="https://www.wnyc.org/" target="_blank">
            <logo-wnyc />
          </a>
          <a href="https://www.nypublicradio.org/" target="_blank">
            <logo-nypr />
          </a>
          <a href="https://www.wnycstudios.org/" target="_blank">
            <logo-wnyc-studios />
          </a>
          <a
            href="https://www.wnyc.org/series/new-jersey-public-radio/"
            target="_blank"
          >
            <logo-njpr />
          </a>
          <a href="https://www.wqxr.org/" target="_blank">
            <logo-wqxr />
          </a>
          <a href="https://www.newsounds.org/" target="_blank">
            <logo-new-sounds />
          </a>
          <a href="https://www.thegreenespace.org/" target="_blank">
            <logo-the-greene-space />
          </a>
        </div>
      </div>
      <hr class="w-full my-4" />
      <div class="bottom">
        <client-only>
          <v-share-tools class="social">
            <v-share-tools-item service="facebook" username="gothamist" />
            <v-share-tools-item service="twitter" username="gothamist" />
            <v-share-tools-item service="instagram" username="gothamist" />
            <v-share-tools-item
              service="youtube"
              username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
            />
          </v-share-tools>
        </client-only>
        <div class="menu">
          <nuxt-link to="/accessibility">Accessibility</nuxt-link>
          <nuxt-link to="/terms">Terms of use</nuxt-link>
          <nuxt-link to="/privacy-policy">Privacy policy</nuxt-link>
        </div>
        <div class="type-fineprint copywrite">
          © 2022 New York Public Radio. All rights reserved.
        </div>
      </div>
      <!-- </div> -->
    </div>
  </section>
</template>

<style lang="scss">
.footer {
  background-color: var(--black-500);
  color: var(--white);
  .content {
    min-height: 300px;
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 3rem;
      .logo-lockup {
        display: flex;
        align-items: flex-end;
        gap: 0.5rem;
        @include media('<lg') {
          flex-direction: column;
          align-items: flex-start;
        }
        .logo {
          width: 225px;
          @include media('<lg') {
            width: 190px;
          }
        }
        .copy {
          @include font-config($type-fineprint);
          color: var(--white200);
          max-width: 380px;
        }
      }
      .logos {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem 1.5rem;
        @include media('<lg') {
          gap: 1rem 1rem;
        }
        a {
          svg path {
            transition: fill 0.25s;
            -webkit-transition: fill 0.25s;
          }
          &:hover {
            svg {
              path {
                fill: var(--link-hover-color) !important;
              }
            }
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      width: 100%;
      color: var(--black300);
      @include media('<md') {
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .social {
        @include media('<md') {
          order: 2;
        }
      }
      .menu {
        display: flex;
        gap: 1rem;
        @include media('<md') {
          flex-direction: column;
          align-items: flex-start;
          order: 1;
        }
      }
      .copywrite {
        @include media('<md') {
          width: 100%;
          order: 3;
        }
      }
    }
  }
  a {
    @include font-config($type-fineprint);
    color: var(--white200);
    font-weight: 400;
  }
}
</style>
