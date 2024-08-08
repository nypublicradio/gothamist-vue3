export default defineNuxtPlugin(() => {
  // Add your features here
  const features = {}

  const enabled: Record<string, boolean> = features || {}
  const disabled: Record<string, boolean> = {}
  for (const feature of Object.entries(enabled))
    disabled[feature[0]] = feature[1]

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
