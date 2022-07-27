// this func allows to just provide the image id and get back the url formate we need for the desired image
export default function useImageId(photoID) {
    const config = useRuntimeConfig()
    const imageUrlTemplate = `${config.IMAGE_BASE_URL}${photoID}/fill-%width%x%height%|format-jpeg|jpegquality-%quality%`
    return imageUrlTemplate
}