<script setup>
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>

<template>
  <section id="footer" class="footer" data-style-mode="dark">
    <div class="content">
      <div class="top grid">
        <div class="hidden lg:flex col-3 p-0">
          <menu-list />
        </div>
        <div class="col-12 lg:col-9 right p-0">
          <div class="logo-lockup">
            <v-flexible-link to="/" class="gothamist-logo">
              <logo-gothamist />
            </v-flexible-link>
            <div class="copy">
              Gothamist is a website about New York City news, arts, and events,
              and food, brought to you by New York Public Radio.
              <v-flexible-link style="color: var(--soybean)" to="/support">
                Support us</v-flexible-link
              >
            </div>
          </div>
          <div class="block lg:hidden">
            <menu-list />
          </div>
          <nypr-logos-bracket />
        </div>
      </div>
      <hr class="w-full my-4" />
      <div class="bottom grid">
        <v-share-tools class="left col-12 lg:col-3 pr-0">
          <v-share-tools-item service="facebook" username="gothamist" />
          <v-share-tools-item service="twitter" username="gothamist" />
          <v-share-tools-item service="instagram" username="gothamist" />
          <v-share-tools-item
            service="youtube"
            username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
          />
        </v-share-tools>
        <div class="right col-12 lg:col-9">
          <div class="menu">
            <v-flexible-link to="/accessibility">Accessibility</v-flexible-link>
            <v-flexible-link to="/terms">Terms of use</v-flexible-link>
            <v-flexible-link to="/privacy-policy"
              >Privacy policy</v-flexible-link
            >
          </div>
          <div class="type-fineprint copyright">
            © 2022 New York Public Radio. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.footer {
  background-color: var(--black-500);
  color: var(--white);
  .content {
    padding-bottom: 25px;
    .top {
      margin: 0;
      .right {
        min-height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 3rem;
        @include media('<lg') {
          min-height: none;
        }
        .logo-lockup {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          @include media('<lg') {
            flex-direction: column;
            align-items: flex-start;
          }
          .gothamist-logo {
            svg {
              width: 225px;
              height: auto;
              path {
                fill: var(--white);
              }
            }
            @include media('<lg') {
              width: 190px;
            }
          }
          .copy {
            @include font-config($type-fineprint);
            color: var(--white200);
            max-width: 370px;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--black300);
      margin: 0;
      @include media('<lg') {
        flex-direction: row-reverse;
        align-items: flex-start;
      }
      .left {
        padding-left: 0;
        padding-right: 0;
        @include media('<lg') {
          justify-content: flex-end;
        }
      }
      .right {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        gap: 1.5rem;
        padding-left: 0;
        padding-right: 0;
        @include media('<lg') {
          margin-top: -2rem;
          flex-direction: column;
        }
        .menu {
          display: flex;
          gap: 1rem;
          a {
            @include font-config($type-fineprint);
            color: var(--white200);
          }
          @include media('<lg') {
            flex-direction: column;
          }
        }
        .copyright {
          color: var(--black300);
        }
      }
    }
  }
}
</style>
