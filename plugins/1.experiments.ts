import Experiment from "~/composables/types/Experiment";

export default defineNuxtPlugin(() => {

  const currentExperiment:Experiment = {
    // Experiment started: Aug 01 2023
    // Two versions of the latest news river. 
    name: 'homepage-latest-news-river',
    variants: {
      0: 'unchanged latest news. river and top feature latest news both start from latest story',
      1: 'stories in latest news river start where top feature left off'
    }
  }

  const readVariant = (experiment:Experiment):number => {
    if (experiment) {
      const cookie = useCookie(`_experiment_${experiment.name}`, { path: '/' })
      const variant = cookie.value && Number(cookie.value)
      return variant
    }
  }

  return {
    provide: {
      experiments: {
        currentExperiment: currentExperiment,
        activeVariant: readVariant(currentExperiment)
      }
    }
  }
})
