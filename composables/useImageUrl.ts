import Image from './types/Image'

// Returns an image template string for use with the SimpleResponsiveImage
// component in nypr-design-system
// You can use the options parameter to manually insert values in the url, useful
// for places where you can't use the image component, like in social metadata

// if you just have the image ID you can use it like this
//useImageUrl({ id: imageId })
export default function useImageUrl(image: Image, options?: { width: number, height: number, quality: number }): string {
  const config = useRuntimeConfig()
  if (!image) {
    return ""
  }
  const imageUrlTemplate = `${config.IMAGE_BASE_URL}${image.id}/fill-%width%x%height%|format-webp|webpquality-%quality%`
  return imageUrlTemplate
    .replace('%width%', options?.width && String(options.width) || '%width%')
    .replace('%height%', options?.height && String(options.height) || '%height%')
    .replace('%quality%', options?.quality && String(options.quality) || '%quality%')
}

const calcQuality = (quality, size) => {
  const qual = size >= 2 ? quality - Math.round(size * 5) : quality
  return qual >= 15 ? qual : 15
}

const getResponsiveSizes = (options: {
    sizes:number[],
    width:number,
    height:number,
    maxWidth:number,
    maxHeight:number}): {size:number, width:number, height:number}[] => {
  let responsiveSizes = []
  let finalSize = false
  for (const size of options.sizes) {
    /* continue if it is NOT the final image and the image has more pixels than its rendered area */
    if (!finalSize && options.maxWidth > options.width) {
      let width = Math.round(options.width * size)
      let height = Math.round(options.height * size)
      /* the image no longer has enough resolution to support the next srcset, use its maximum size and make it the last on the srcset list */
      if (width > options.maxWidth || height > options.maxHeight) {
        height = Math.round((options.height / options.width) * options.maxWidth)
        width = options.maxWidth
        finalSize = true
      }
      // if we are on the last size in the array, set finalSize to true
      if (options.sizes.length - 1 === options.sizes.indexOf(size)) {
        finalSize = true
      }
      responsiveSizes.push({size, width, height})
    }
  }
  return responsiveSizes
}

export function useResponsiveSrcset(image: Image, sizes: number[], options?: { width: number, height: number, quality: number, maxWidth?:number, maxHeight?:number }) {
  const maxWidth = options.maxWidth ?? image.width ?? Infinity
  const maxHeight = options.maxHeight ?? image.height ?? Infinity
  const responsiveSizes = getResponsiveSizes({
    sizes,
    width: options.width,
    height: options.height,
    maxWidth,
    maxHeight
  })

  const responsiveSrcset = responsiveSizes.reduce((srcset, responsiveSize, index) => {
    const url = useImageUrl(image, {
      width: responsiveSize.width,
      height:responsiveSize.height,
      quality: calcQuality(options.quality, responsiveSize.size)
    })
    return srcset + `${url} ${responsiveSize.size}x${index < responsiveSizes.length - 1 ? ',' : ''} `
  }, '')
  return responsiveSrcset
}

export function usePreloadResponsiveImage(href:string, imagesrcset:string, priority=9) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        fetchpriority: 'high',
        href,
        imagesrcset,
        tagPriority: priority
      }
    ]
  })
}