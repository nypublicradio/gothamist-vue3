export default interface ProductBanner {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  frequencyInHours: number
  location: 'TOP' | 'BOTTOM'
}
