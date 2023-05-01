import currentExperiments from "~/experiments";
import Experiment from "~/composables/types/Experiment";

export default defineNuxtPlugin(() => {
    let activeVariant:number

    const chooseWeightedRandom = (weights:number[]):number => {
      const sumOfWeights = weights.reduce(
        (sum, weight) => sum + weight,
      0)
      const choice = Math.random()
      let threshold = 0
      for (let i = 0; i < weights.length; i++) {
        threshold += weights[i]/sumOfWeights
        if (choice <= threshold) {
          return i
        }
      }
    }

    const assignVariants = (experiments:Experiment[]):void => {
      experiments.forEach(experiment => {
        const variant = readVariant(experiment) || chooseVariant(experiment)
        assignVariant(experiment, variant)
      })
    }

    const chooseVariant = (experiment:Experiment):number => {
      return chooseWeightedRandom(experiment.variants.map(variant => variant.weight))
    }

    const readVariant = (experiment:Experiment):number => {
      const cookie = useCookie(`_experiment_${experiment.name}`, { path: '/' })
      if (cookie.value) {
        return Number(cookie.value)
      }
    }

    const assignVariant = (experiment:Experiment, variant:number):void => {
      const cookie = useCookie(
        `_experiment_${experiment.name}`, 
        { 
          path: '/',
          maxAge: experiment.maxAgeSeconds
        }
      )
      cookie.value = String(variant)
      if (experiment === getCurrentExperiment()) {
        activeVariant = variant
      }
    }

    const getCurrentExperiment = () => {
      if (currentExperiments.length > 0) {
        return currentExperiments[0]
      } else {
        return {} 
      }
    }

    assignVariants(currentExperiments)

    return {
      provide: {
        current: getCurrentExperiment(),
        activeVariant
      }
    }
})
