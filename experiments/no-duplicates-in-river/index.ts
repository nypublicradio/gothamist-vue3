export default {
    // A helper exp-{name}-{var} class will be added to the root element
    name: 'no-duplicates-in-river',

    maxAgeSeconds: 60 * 60 * 24 * 30, //30 days

    variants: [
      { name: 'original' }, // 0: Original
      { name: 'no-dupes' }  // 1: Remove duplicate stories from the latest news river
    ]
  }