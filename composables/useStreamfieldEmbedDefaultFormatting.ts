// WNYC's on-demand player (//www.wnyc.org/widgets/ondemand_player/<station>/) is served from our own copy in public/widgets/ondemand_player
const WNYC_PLAYER = /(?:https?:)?\/\/(?:[\w-]+\.)*wnyc\.org\/widgets\/ondemand_player\/(?:[\w-]+\/?)?/g

// Rewrites the html of a default embed block before it is rendered. Add further manipulations of embed code here.
export default function useStreamfieldEmbedDefaultFormatting(html: string): string {
  return html
    .replace(WNYC_PLAYER, '/widgets/ondemand_player/')
    // some embeds have the hash percent-encoded into the path, which would 404 as a static file
    .replaceAll('/widgets/ondemand_player/%23file=', '/widgets/ondemand_player/#file=')
}
