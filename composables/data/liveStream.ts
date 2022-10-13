// Get a list of article pages using the Aviary /pages api
export async function getLiveStream() {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(config['LIVESTREAM_URL'])
    console.log('stream data = ', data)
    return { data: data, error }
}