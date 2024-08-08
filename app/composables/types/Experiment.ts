export default interface Experiment {
  name: string
  maxAgeSeconds?: number
  variants: { weight: number }[]
}
