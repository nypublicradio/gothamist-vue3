export default function useImageId(photoID) {
    const config = useRuntimeConfig()
    const imageUrlTemplate = `${config.IMAGE_BASE_URL}${photoID}/fill-%width%x%height%|format-jpeg|jpegquality-%quality%`
    return imageUrlTemplate
}