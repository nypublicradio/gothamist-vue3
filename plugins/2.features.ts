export default defineNuxtPlugin(() => {

  // Add your features here
  const { $experiments } = useNuxtApp()

  const features = {
    // Remove duplicate stories from the river on the home page
    // Part of an a/b test
    // - Matt Walsh
    // Experiment started:Aug
    'experiment-deduplicate-river':
      $experiments.currentExperiment?.name === 'homepage-latest-news-river' &&
      $experiments.activeVariant === 1
  }

  const enabled = features || {}
  const disabled = {}
  for (const feature of Object.entries(enabled)) {
    disabled[feature[0]] = !(feature[1] === false)
  }
  const classes = Object.entries(enabled)
    .map(entry => (entry[1] ? `${entry[0]}-enabled` : `${entry[0]}-disabled`))

  useHead({
    bodyAttrs: {
      class: classes.join(' ')
    },
  })

  return {
    provide: {
      features: { enabled, disabled, classes }
    }
  }
})