import currentExperiments from "~/experiments";
import Experiment from "~/composables/types/Experiment";
import { get } from "cypress/types/lodash";

export default defineNuxtPlugin(() => {
    const abTestCookie = 'ablot'
    let activeVariant:number

    const readVariants = (experiments:Experiment[]):void => {
      experiments.forEach(experiment => {
        if (experiment === getCurrentExperiment() && typeof activeVariant === 'undefined') {
          activeVariant = readVariant(experiment)
        }
      })
    }

    const readVariant = (experiment:Experiment):number => {
      const cookie = useCookie(abTestCookie, { path: '/' })
      if (typeof cookie.value !== 'undefined') {
        return Number(cookie.value)
      }
    }

    const getCurrentExperiment = ():Experiment => {
      if (currentExperiments.length > 0) {
        return currentExperiments[0]
      } else {
        return undefined
      }
    }

    readVariants(currentExperiments)

    return {
      provide: {
        experiments: {
          current: getCurrentExperiment(),
          activeVariant
        }
      }
    }
})
