export default {
    // A helper exp-{name}-{var} class will be added to the root element
    name: 'homepage-river',

    maxAgeSeconds: 60 * 60 * 24 * 30, //30 days

    variants: [
      { weight: 1 }, // 0: Original
      { weight: 1 }  // 1: Remove duplicate stories from the latest news river
    ]
  }