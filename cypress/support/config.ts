export const axeConfig = {
  retries: 3,
  interval: 500,
  includedImpacts: ['critical', 'serious'],
  rules: {
    // triggered by inserted nativo iframes that we can't control
    'frame-title': { enabled: false },
  },
}

// what checkA11y scans: the page, minus the Nuxt DevTools overlay the dev server injects (not our UI;
// newer axe-core flags its low-contrast labels)
export const axeContext = { exclude: [['nuxt-devtools-frame']] }

export function logViolations(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`,
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }),
  )

  cy.task('table', violationData)
}
