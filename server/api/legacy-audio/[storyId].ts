// Audio URL for a Publisher story; resolves legacy /audio/json/<id>/ player embeds (see composables/useWnycAudioEmbeds.ts)
export default defineEventHandler(async (event) => {
  const storyId: string | undefined = event?.context?.params?.storyId
  if (!/^\d+$/.test(storyId ?? ''))
    throw createError({ statusCode: 400, statusMessage: 'Invalid story id' })
  const config = useRuntimeConfig()
  // sparse fieldset: only the audio attribute, not the whole story
  const res = await $fetch<{ data?: { attributes?: { audio?: string | string[] } } }>(
    `${config.public.PUBLISHER_BASE_API}v3/story-pk/${storyId}/?fields[story]=audio`,
  )
  // set after the fetch so Publisher errors aren't cached
  setResponseHeader(event, 'Cache-Control', 'max-age=3600')
  // Publisher gives one URL or a list; the player takes the first. '' = story has no audio
  return { audio: [res?.data?.attributes?.audio].flat()[0] ?? '' }
})
