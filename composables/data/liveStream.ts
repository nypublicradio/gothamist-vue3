import { slotFlagsText } from '@vue/shared'
import { useCurrentEpisode } from '~/composables/states'

// Get a list of article pages using the Aviary /pages api
export async function getLiveStream(selectedSlug) {
    const config = useRuntimeConfig()
    const currentEpisode = useCurrentEpisode()
    const { data, error } = await useFetch(config['LIVESTREAM_URL'])
    console.log('stream data = ', data.value.data)
    const streams = data.value.data
    const wnycfm939Stream = streams.find((stream) => stream.attributes.slug === selectedSlug)
    //console.log('wnycfm939Stream= ', wnycfm939Stream)
    currentEpisode.value = wnycfm939Stream.attributes

    //return { data: data, error }
}