// Some third-party scripts (ad/analytics vendors) clobber window.Image, which then throws
// "Image is not a constructor" for any code that does `new Image()`. Locking it down here,
// injected as the earliest possible inline <head> script, prevents that regardless of load order.
export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        tagPriority: 'critical',
        children: `(function () {
  var NativeImage = window.Image
  if (typeof NativeImage !== 'function')
    return
  try {
    Object.defineProperty(window, 'Image', {
      configurable: true,
      get: function () { return NativeImage },
      set: function () {
        try {
          window.dispatchEvent(new CustomEvent('gothamist:image-overwrite-blocked', { detail: { stack: new Error().stack } }))
        }
        catch (e) {}
      },
    })
  }
  catch (e) {}
})()`,
      },
    ],
  })
})
