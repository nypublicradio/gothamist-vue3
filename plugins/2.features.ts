export default defineNuxtPlugin(() => {
  // Add your features here
  const { $experiments } = useNuxtApp()

  const features = {
    // Remove duplicate stories from the river on the home page
    // Part of an a/b test
    // - Matt Walsh
    // Experiment started: May 17 2023
    'experiment-deduplicate-river':
      $experiments.current?.name === 'homepage-river'
      && $experiments.activeVariant === 1,
  }

  const enabled: Record<string, boolean> = features || {}
  const disabled: Record<string, boolean> = {}
  for (const feature of Object.entries(enabled))
    disabled[feature[0]] = !(feature[1] === false)

  const classes: string[] = Object.entries(enabled)
    .map(entry => (entry[1] ? `${entry[0]}-enabled` : `${entry[0]}-disabled`))

  useHead({
    bodyAttrs: {
      class: classes.join(' '),
    },
  })

  return {
    provide: {
      features: { enabled, disabled, classes },
    },
  }
})
