import { reactive } from 'vue'
import { DomUtils, parseDocument } from 'htmlparser2'

// Legacy Publisher player embeds point at audio by story id (#file=/audio/json/<id>/)
const LEGACY_AUDIO_JSON = /#file=\/audio\/json\/(\d+)\/?/
// story id -> audio URL, shared so each id is fetched once; missing while loading, '' once a lookup found no audio
const legacyAudioUrls = reactive<Record<string, string>>({})
// not reactive: marking an id as requested must not trigger a recompute
const requestedAudioIds = new Set<string>()

// Returns the html with its iframe srcs rewritten. Call it inside a computed so it re-runs when a legacy audio URL arrives.
export function useWnycAudioEmbeds(html: string): string {
  if (!html)
    return ''
  // most embeds have no WNYC player, so skip the parse/serialize round trip for them
  if (!html.includes('ondemand_player') && !html.includes('/audio/json/'))
    return html
  const doc = parseDocument(html)

  for (const iframe of DomUtils.getElementsByTagName('iframe', doc)) {
    let src = iframe.attribs.src
    if (!src)
      continue

    // Serve WNYC's on-demand player locally (public/widgets/ondemand_player); station variants like /widgets/ondemand_player/wnyc/ use the same player
    try {
      // the base resolves protocol-relative //www.wnyc.org srcs; an encoded %23file= becomes a real hash so the rewrite keeps it
      const url = new URL(src.replace(/%23file=/i, '#file='), 'https://localhost')
      if (/(?:^|\.)wnyc\.org$/.test(url.hostname) && url.pathname.startsWith('/widgets/ondemand_player'))
        src = `/widgets/ondemand_player/${url.search}${url.hash}`
    }
    catch {
      // malformed src, leave it as is
    }

    // Resolve legacy Publisher audio embeds. Publisher's CORS only allows wnyc.org, so look the story up through our server (server/api/legacy-audio).
    const legacyAudioId = src.match(LEGACY_AUDIO_JSON)?.[1]
    if (legacyAudioId) {
      if (!import.meta.server && !requestedAudioIds.has(legacyAudioId)) {
        requestedAudioIds.add(legacyAudioId)
        $fetch<{ audio: string }>(`/api/legacy-audio/${legacyAudioId}`)
          .then(({ audio }) => {
            legacyAudioUrls[legacyAudioId] = audio
          })
          .catch((error) => {
            // network failure or 5xx is transient: clearing the id lets the recompute this '' write triggers (once) and later mounts retry; a 4xx is final
            if (!error?.response || error.response.status >= 500)
              requestedAudioIds.delete(legacyAudioId)
            legacyAudioUrls[legacyAudioId] = ''
          })
      }
      const audioUrl = legacyAudioUrls[legacyAudioId]
      if (audioUrl === undefined) {
        // no src while loading, or the widget requests /audio/json/<id>/ from our server and 404s
        delete iframe.attribs.src
        continue
      }
      // encoded so the widget's hash parsing keeps the URL's own query string (&awEpisodeId=…);
      // '' gives an empty #file=, which makes the widget show "Audio player unavailable"
      src = src.replace(LEGACY_AUDIO_JSON, `#file=${encodeURIComponent(audioUrl)}`)
    }
    iframe.attribs.src = src
  }

  return DomUtils.getOuterHTML(doc)
}
