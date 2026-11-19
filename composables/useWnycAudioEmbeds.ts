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
  const doc = parseDocument(html)

  for (const iframe of DomUtils.getElementsByTagName('iframe', doc)) {
    let src = iframe.attribs.src
    if (!src)
      continue

    // Serve WNYC's on-demand player locally (public/widgets/ondemand_player); station variants like /widgets/ondemand_player/wnyc/ use the same player
    try {
      const url = new URL(src)
      if (url.hostname.includes('wnyc.org') && url.pathname.startsWith('/widgets/ondemand_player'))
        src = `/widgets/ondemand_player/${url.search}${url.hash}`
    }
    catch {
      // already relative
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
            // no response = network failure (e.g. offline), so let a later render retry; an HTTP error like 404 is final
            if (!error?.response)
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
