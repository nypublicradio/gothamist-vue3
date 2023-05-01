import currentExperiments from "~/experiments";
import Experiment from "~/composables/types/Experiment";
import { get } from "cypress/types/lodash";

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
        if (experiment === getCurrentExperiment() && typeof activeVariant === 'undefined') {
          activeVariant = readVariant(experiment) ?? chooseVariant(experiment)
        }
      })
    }

    const chooseVariant = (experiment:Experiment):number => {
      return chooseWeightedRandom(experiment.variants.map(variant => variant.weight))
    }

    const readVariant = (experiment:Experiment):number => {
      const cookie = useCookie(`_experiment_${experiment.name}`, { path: '/' })
      if (typeof cookie.value !== 'undefined') {
        return Number(cookie.value)
      }
    }

    const saveVariant = (experiment:Experiment, variant:number):void => {
      const cookie = useCookie(
        `_experiment_${experiment.name}`, 
        { 
          path: '/',
          maxAge: experiment.maxAgeSeconds
        }
      )
      cookie.value = String(variant)
    }

    const getCurrentExperiment = ():Experiment => {
      if (currentExperiments.length > 0) {
        return currentExperiments[0]
      } else {
        return undefined
      }
    }

    assignVariants(currentExperiments)

    if (!process.client) {
      saveVariant(getCurrentExperiment(), activeVariant)
    }

    return {
      provide: {
        experiments: {
          current: getCurrentExperiment(),
          activeVariant
        }
      }
    }
})
