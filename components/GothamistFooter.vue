<script setup>
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>

<template>
  <section class="footer" data-style-mode="dark">
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
          <div class="logos flex">
            <logo-nypr />
            <div class="bracket bracket-left" />
            <v-flexible-link to="https://www.wnyc.org/" target="_blank">
              <logo-wnyc />
            </v-flexible-link>
            <v-flexible-link to="https://www.wnyc.org/" target="_blank">
              <logo-gothamist />
            </v-flexible-link>
            <v-flexible-link to="https://www.wnycstudios.org/" target="_blank">
              <logo-wnyc-studios />
            </v-flexible-link>
            <v-flexible-link
              to="https://www.wnyc.org/series/new-jersey-public-radio/"
              target="_blank"
            >
              <logo-njpr />
            </v-flexible-link>
            <v-flexible-link to="https://www.wqxr.org/" target="_blank">
              <logo-wqxr />
            </v-flexible-link>
            <v-flexible-link to="https://www.newsounds.org/" target="_blank">
              <logo-new-sounds />
            </v-flexible-link>
            <div class="inline-flex">
              <v-flexible-link
                to="https://www.thegreenespace.org/"
                target="_blank"
              >
                <logo-the-greene-space />
              </v-flexible-link>
              <div class="bracket bracket-right ml-3" />
            </div>
          </div>
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
          <div class="type-fineprint copywrite">
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
            max-width: 350px;
          }
        }
        .logos {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem 1.5rem;
          @include media('<xl') {
            gap: 1rem 0.75rem;
          }
          @include media('<lg') {
            gap: 1rem 1rem;
          }
          @include media('<sm') {
            gap: 1rem 0.65rem;
          }
          svg {
            &.gothamist-logo {
              width: auto;
              height: 16px;
            }
            &.njpr-logo {
              width: auto;
              height: 18px;
            }
            path {
              fill: var(--white);
            }
          }
          .bracket {
            height: 32px;
            width: 8px;
            border: 1px solid var(--black300);
            &.bracket-left {
              border-right: none;
            }
            &.bracket-right {
              border-left: none;
            }
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
            font-weight: 400;
          }
          @include media('<lg') {
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>
