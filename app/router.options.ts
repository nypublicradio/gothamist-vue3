import type { RouterConfig } from '@nuxt/schema';

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
    scrollBehavior: async function(to, from, savedPosition) {  
        if (savedPosition) {
            return savedPosition;
        } else if (to.hash) {
            return { el: `#${to.hash}` }
        }  
        return { x: 0, y: 0 };
      }
};