import Image from './types/Image'

// Returns an image template string for use with the SimpleResponsiveImage
// component in nypr-design-system
// You can use the options parameter to manually insert values in the url, useful 
// for places where you can't use the image component, like in social metadata
export default function useImageUrl(image: Image, options?: { width: number, height: number, quality: number }): string {
    const config = useRuntimeConfig()
    const imageUrlTemplate = `${config.IMAGE_BASE_URL}${image.id}/fill-%width%x%height%|format-jpeg|jpegquality-%quality%`
    return imageUrlTemplate
        .replace('%width%', options?.width && String(options.width) || '%width%')
        .replace('%height%', options?.height && String(options.height) || '%height%')
        .replace('%quality%', options?.quality && String(options.quality) || '%quality%')
}
