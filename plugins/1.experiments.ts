import type Experiment from '~/composables/types/Experiment'
import currentExperiments from '~/experiments'

export default defineNuxtPlugin(() => {
  let activeVariant: number
  const defaultMaxAge = 60 * 60 * 24 * 30 // 30 days

  const chooseWeightedRandom = (weights: number[]): number => {
    const sumOfWeights = weights.reduce(
      (sum, weight) => sum + weight,
      0,
    )
    const choice = Math.random()
    let threshold = 0
    for (let i = 0; i < weights.length; i++) {
      threshold += weights[i] / sumOfWeights
      if (choice <= threshold)
        return i
    }
    return null
  }

  const chooseVariant = (experiment: Experiment): number => {
    return chooseWeightedRandom(experiment.variants.map(variant => variant.weight))
  }

  const readVariant = (experiment: Experiment): number => {
    const cookie = useCookie(`_experiment_${experiment.name}`, { path: '/' })
    if (typeof cookie.value !== 'undefined')
      return Number(cookie.value)
    return null
  }

  const saveVariant = (experiment: Experiment, variant: number): void => {
    const cookie = useCookie(
        `_experiment_${experiment.name}`,
        {
          path: '/',
          maxAge: experiment.maxAgeSeconds ?? defaultMaxAge,
        },
    )
    cookie.value = String(variant)
  }

  const getCurrentExperiment = (): Experiment => {
    if (currentExperiments.length > 0)
      return currentExperiments[0]
    else
      return null
  }

  const assignVariants = (experiments: Experiment[]): void => {
    experiments.forEach((experiment) => {
      if (experiment === getCurrentExperiment() && typeof activeVariant === 'undefined')
        activeVariant = readVariant(experiment) ?? chooseVariant(experiment)
    })
  }

  assignVariants(currentExperiments)

  if (!process.client)
    saveVariant(getCurrentExperiment(), activeVariant)

  return {
    provide: {
      experiments: {
        current: getCurrentExperiment(),
        activeVariant,
      },
    },
  }
})
