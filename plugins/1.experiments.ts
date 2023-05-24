import currentExperiments from "~/experiments";
import Experiment from "~/composables/types/Experiment";
import { get } from "cypress/types/lodash";

export default defineNuxtPlugin(() => {
    let activeVariant:number
    const defaultMaxAge = 60 * 60 * 24 * 30 // 30 days

    const assignVariants = (experiments:Experiment[]):void => {
      experiments.forEach(experiment => {
        if (experiment === getCurrentExperiment() && typeof activeVariant === 'undefined') {
          activeVariant = readVariant(experiment)
        }
      })
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
          maxAge: experiment.maxAgeSeconds ?? defaultMaxAge,
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
