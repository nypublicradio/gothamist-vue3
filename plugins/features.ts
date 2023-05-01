export default defineNuxtPlugin(() => {

  // Add your features here
  const { $experiments } = useNuxtApp()

  const features = {
    // Remove duplicate stories from the river on the home page
    // Part of an a/b test
    // - Matt Walsh
    // Experiment started: May 3 2023
    'experiment-deduplicate-river': 
      $experiments && $experiments.current.name === 'no-duplicates-in-river' && 
      $experiments.activeVariant === 1
  }

  const enabled = features || {}
  const disabled = {}
  for (const feature of Object.entries(enabled)) {
    disabled[feature[0]] = !feature[1]
  }
  const classes = Object.entries(enabled)
    .map(entry => (entry[1] ? `${entry[0]}-enabled` : `${entry[0]}-disabled`))
  inject('features', { enabled, disabled, classes })

  return {
    provide: {
      features: { enabled, disabled, classes }
    }
  }
})