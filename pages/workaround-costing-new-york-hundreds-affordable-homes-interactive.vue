<script setup>
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'

const shareTitle = 'The workaround that\'s costing New York hundreds of affordable homes'
const shareUrl
  = 'https://gothamist.com/workaround-costing-new-york-hundreds-affordable-homes-interactive'

useSeoMeta(
  {
    title: `${shareTitle} - Gothamist`,
    description:
      'An in-depth look at the workaround that\'s costing New York hundreds of affordable homes.',
    ogTitle: shareTitle,
    ogImage:
      'https://demo.gothamist.com/workaround-costing-new-york-hundreds-affordable-homes-interactive/image1.jpg',
    ogDescription:
      'An in-depth look at the workaround that\'s costing New York hundreds of affordable homes.',
    ogUrl: shareUrl,
  },
  { tagPriority: 1 },
)

const article = {
  authors: [
    {
      firstName: 'David',
      lastName: 'Brand',
      photo:
        'https://api-prod.gothamist.com/images/338981/fill-60x60%7Cformat-webp%7Cwebpquality-70/',
      slug: 'david-brand',
    },
    {
      firstName: 'Joe',
      lastName: 'Hong',
      photo: '/avatar.svg',
      slug: 'joe-hong',
    },
  ],
  // publicationDate: '2026-06-18',
  publicationDate: '2026-06-18T09:00:00-04:00',
}

onMounted(() => {
  const steps = document.querySelectorAll('.step')
  const imageLayers = document.querySelectorAll('.image-layer')

  function showImage(id) {
    imageLayers.forEach((l) => {
      l.classList.remove('is-visible')
    })
    const target = document.getElementById(id)
    if (target)
      target.classList.add('is-visible')
  }

  // Direction-aware observer: steps activate only when they enter the center
  // band of the viewport (-35% top, -35% bottom = middle 30%). This means
  // only the step the user is actually reading fires, regardless of scroll direction.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((s) => {
            s.classList.remove('is-active')
          })
          entry.target.classList.add('is-active')
          showImage(entry.target.getAttribute('data-image'))
        }
      })
    },
    { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
  )

  steps.forEach((step) => {
    observer.observe(step)
  })

  // Mobile lock-in: when the scrollytelling section first comes into view,
  // smoothly snap to its top so the image panel is established before steps begin.
  // Resets once the section leaves so it re-locks coming from either direction.
  const scrollyEl = document.getElementById('scrolly')
  let lockTriggered = false
  const lockObs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !lockTriggered && window.innerWidth <= 640) {
        lockTriggered = true
        scrollyEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (!entry.isIntersecting)
        lockTriggered = false
    },
    { threshold: 0.08 },
  )
  lockObs.observe(scrollyEl)

  // Map scroll trap: overlay intercepts scroll and passes it to the page.
  // Clicking the map dismisses the overlay so the user can interact freely.
  // Moving the mouse out restores it for the next scroll-through.
  const mapOverlay = document.querySelector('.map-overlay')
  const mapWrapper = document.querySelector('.map-wrapper')
  if (mapOverlay && mapWrapper) {
    mapOverlay.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault()
        window.scrollBy({ top: e.deltaY, behavior: 'auto' })
      },
      { passive: false },
    )

    mapOverlay.addEventListener('click', () => {
      mapOverlay.style.display = 'none'
      // Move focus into the iframe so keyboard users can interact with the map
      mapWrapper.querySelector('iframe').focus()
    })

    mapWrapper.addEventListener('mouseleave', () => {
      mapOverlay.style.display = ''
    })
  }
})
</script>

<template>
  <div class="custom-page">
    <section class="mb-6">
      <div class="article-body">
        <h1 class="mb-6">
          The workaround that's costing New York hundreds of affordable homes
        </h1>
        <hr class="black">
        <div class="flex flex-column gap-125 pt-4">
          <div class="author-images flex flex-wrap">
            <img
              v-for="author in article.authors"
              :key="author.slug"
              :src="author.photo"
              :alt="`${author.firstName} ${author.lastName}`"
              class="author-image"
            >
          </div>
          <div class="byline">
            By
            <template v-for="(author, index) in article.authors" :key="author.slug">
              <NuxtLink :to="`/staff/${author.slug}`">
                {{ author.firstName }} {{ author.lastName }}
              </NuxtLink><template v-if="index < article.authors.length - 2">
                ,
              </template><template v-else-if="index === article.authors.length - 2">
                and
              </template>
            </template>
          </div>
          <date-published :article="article" />
        </div>
        <hr class="mt-4">
        <VShareTools label="Share" class="mt-3">
          <VShareToolsItem
            action="share"
            service="facebook"
            :url="shareUrl"
            :utm-parameters="{
              medium: 'social',
              source: 'facebook',
              campaign: 'shared_facebook',
            }"
            @share="
              $analytics.scheduleEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Article Byline',
                event_label: 'Social Share Facebook',
              })
            "
          />

          <VShareToolsItem
            action="share"
            service="twitter"
            :url="shareUrl"
            :share-parameters="{ text: shareTitle, via: 'gothamist' }"
            :utm-parameters="{
              medium: 'social',
              source: 'twitter',
              campaign: 'shared_twitter',
            }"
            @share="
              $analytics.scheduleEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Article Byline',
                event_label: 'Social Share Twitter',
              })
            "
          />
          <VShareToolsItem
            action="share"
            service="reddit"
            :url="shareUrl"
            :share-parameters="{ title: shareTitle }"
            :utm-parameters="{
              medium: 'social',
              source: 'reddit',
              campaign: 'shared_reddit',
            }"
            @share="
              $analytics.scheduleEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Article Byline',
                event_label: 'Social Share Reddit',
              })
            "
          />
          <VShareToolsItem
            action="share"
            service="email"
            :url="shareUrl"
            :share-parameters="{ body: `${shareTitle} - %URL%` }"
            :utm-parameters="{
              medium: 'social',
              source: 'email',
              campaign: 'shared_email',
            }"
            @share="
              $analytics.scheduleEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Article Byline',
                event_label: 'Social Share Email',
              })
            "
          />
        </VShareTools>
        <hr class="mt-3">
      </div>
    </section>
    <!-- custom section -->
    <section class="mb-6">
      <div class="article-body">
        <p>
          Something is missing on the nearly block-size gravel lot at East 125th Street
          and Park Avenue in East Harlem, and it's not just the building.
        </p>
        <p>
          The property owner, Clipper Equity, has designs to construct several highrise
          apartment towers that could soon reach hundreds of feet above the Metronorth
          train station next door. Absent from the plans, however, are about three dozen
          affordable units that may have been added to the city's housing stock if not for
          a tax break program that critics say incentivizes developers to break big
          projects up into smaller buildings in order to skirt higher pay standards.
        </p>
        <p>
          Instead of a single structure, Clipper filed permits to develop a cluster of
          seven 99-unit buildings on newly divided tax lots and receive a property tax
          exemption through the state's 485x program. The attic, approved by city
          officials, has become commonplace, leading to an ongoing dispute with
          influential labor unions who say it suppresses wages.
        </p>
        <p>
          But the 99-unit strategy poses another issue: A Gothamist analysis of building
          permit data shows dozens of arrangements like this one are taking a rising toll
          on the city's affordable housing production.
        </p>
        <p>
          Gothamist identified 48 clusters of multiple buildings with less than 100 units,
          like the proposed East Harlem complex. In total, developers plan to construct
          538 fewer units of affordable housing than they would have been required to if
          each assemblage was instead a single building.
        </p>
        <p>
          "You're losing units of production on the affordable side and overall," said
          Brad Greenburg, CEO of NYU's Furman Center, a housing research group. "These
          projects are not delivering the maximum number of units that they could have,
          and it's never good to lose units."
        </p>
        <p>
          To conduct the analysis, Gothamist used city data to identify adjacent 99-unit
          buildings with the same owners, architects, zoning diagrams and financing
          records.
        </p>
      </div>

      <div id="scrolly">
        <div id="sticky-side">
          <div id="img-intro" class="image-layer is-visible">
            <img
              src="/workaround-costing-new-york-hundreds-affordable-homes-interactive/image0.jpg"
              alt="Introduction image"
            >
          </div>
          <div id="img-building" class="image-layer">
            <img
              src="/workaround-costing-new-york-hundreds-affordable-homes-interactive/image1.jpg"
              alt="Architectural diagram of building cluster in Southeast Queens"
            >
          </div>
          <div id="img-zoning" class="image-layer">
            <img
              src="/workaround-costing-new-york-hundreds-affordable-homes-interactive/image2.jpg"
              alt="Building A and Building B zoning diagram, Upper East Side"
            >
          </div>
        </div>

        <div id="scroll-steps">
          <div class="step is-active" data-image="img-intro">
            <div class="step-inner">
              <p class="step-text">
                So far, at least 538 affordable units have been lost.
              </p>
            </div>
          </div>
          <div class="step" data-image="img-building">
            <div class="step-inner">
              <p class="step-text">
                The reduction is the result of bigger development projects being broken up
                into clusters of smaller buildings.
              </p>
            </div>
          </div>
          <div class="step" data-image="img-building">
            <div class="step-inner">
              <p class="step-text">
                Some residential clusters are made up of adjacent buildings, each with 99
                or fewer units, like this development on Far Rockaway Boulevard in
                Southeast Queens.
              </p>
            </div>
          </div>
          <div class="step" data-image="img-building">
            <div class="step-inner">
              <p class="step-text">
                If it had been built as a single building, it would have added 72
                affordable units to the city's housing stock.
              </p>
            </div>
          </div>
          <div class="step" data-image="img-building">
            <div class="step-inner">
              <p class="step-text">
                But as three separate buildings, the developer was only required to
                include 57 affordable units in the project.
              </p>
            </div>
          </div>
          <div class="step" data-image="img-zoning">
            <div class="step-inner">
              <p class="step-text">
                From the outside, other clusters appear to be a single building, like this
                one on the Upper East Side of Manhattan:
              </p>
            </div>
          </div>
          <div class="step" data-image="img-zoning">
            <div class="step-inner">
              <p class="step-text">
                As a single 198-unit building, it would have been required to have 50
                affordable units. But as an assemblage of two 99-unit buildings, that
                overall number dropped to just 40.
              </p>
            </div>
          </div>
          <div class="scroll-spacer" />
        </div>
      </div>

      <div class="article-body">
        <p>
          Here's a map of all the clusters and where the 538 missing affordable units
          would have been located:
        </p>
        <div class="map-wrapper mb-6">
          <iframe
            src="https://gothamist-project-prod.s3.amazonaws.com/485x/index.html"
            width="100%"
            height="600"
            style="border: none"
            title="Affordable Units Lost"
            allowfullscreen
          />
          <button class="map-overlay" aria-label="Click to interact with the map">
            <span class="map-overlay-label">Click to interact with map</span>
          </button>
        </div>
        <p>
          State lawmakers enacted the property tax break, known as 485x, in 2024 to
          replace a previous exemption that expired two years earlier. The program applies
          different construction wage and affordable housing rules to different size
          projects in exchange for decades-long tax abatements.
        </p>
        <p>
          Under the new scheme, higher wage standards kick in for projects of 100 or more
          units, meaning developers who build just under the threshold can save money — a
          strategy they say keeps construction financially feasible.
        </p>
      </div>
    </section>
  </div>
</template>

<style>
.byline {
  color: var(--text-color);
  font-family: var(--font-family-header);
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-500);
  line-height: 15.4px;
  text-decoration: none;
}
.author-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  margin-bottom: 10px;
}
/* The global section rule sets overflow:hidden which breaks position:sticky.
   Override it so #sticky-side can stick correctly. */
.custom-page section {
  overflow: visible;
}
.article-body {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 2rem;
  h1 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
  }
}
/* Scrollytelling — desktop */
#scrolly {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
}
#sticky-side {
  position: sticky;
  top: 0;
  width: 58%;
  height: 100vh;
  flex-shrink: 0;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  opacity: 0;
  transition: opacity 1s ease;
  pointer-events: none;
}
.image-layer.is-visible {
  opacity: 1;
}
.image-layer img {
  max-width: 100%;
  max-height: calc(100vh - 6rem);
  object-fit: contain;
  display: block;
}
#scroll-steps {
  flex: 1;
  padding: 0 6% 0 5%;
}
.step {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
}
.step-inner {
  max-width: 360px;
}
.step-text {
  font-family: "Reckless Neue", Georgia, serif;
  font-size: 20.25px;
  line-height: 1.35;
  font-weight: 400;
  color: #ccc;
  transition: color 0.8s ease;
}
.step.is-active .step-text {
  color: #111;
}
.scroll-spacer {
  height: 10vh;
}

/* Map scroll trap prevention */
.map-wrapper {
  position: relative;
}
.map-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 14px;
}
.map-overlay-label {
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  padding: 5px 12px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
}
.map-overlay:focus {
  outline: 3px solid #005fcc;
  outline-offset: -3px;
}
.map-overlay:hover::after {
  opacity: 1;
}

/* Scrollytelling — mobile */
@media (max-width: 640px) {
  #scrolly {
    flex-direction: column;
  }
  #sticky-side {
    position: sticky;
    top: 125px;
    width: 100%;
    height: 50vh;
    z-index: 10;
  }
  .image-layer {
    padding: 1rem;
  }
  .image-layer img {
    max-height: calc(50vh - 2rem);
  }
  #scroll-steps {
    width: 100%;
    padding: 0 1.25rem;
  }
  .step {
    min-height: 85vh;
    padding: 2rem 0;
    align-items: center;
  }
  .step-inner {
    max-width: 100%;
  }
  .step-text {
    font-size: 18px;
    color: #111;
    opacity: 0;
    transition: opacity 0.9s ease;
  }
  .step.is-active .step-text {
    opacity: 1;
  }
}
</style>
