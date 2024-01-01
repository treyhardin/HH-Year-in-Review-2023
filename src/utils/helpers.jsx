export const throttle = (func, delay) => {

  let timeout = null;

  return (...args) => {
    if (timeout === null) {
      func(...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
    }
  };
}

export const getViewportVisibility = (el, options) => {

  var viewportOffset = el.getBoundingClientRect();
  var top = viewportOffset.top
  var bottom = viewportOffset.bottom
  var elementHeight = viewportOffset.height
  var viewport = window.innerHeight

  if (top < viewport && bottom > 0) {

    // console.log(`Top:${top} Bottom:${bottom} Viewport:${viewport} Height:${viewportOffset.height}`)
    var scrollProgress

    if (options) {

      switch (options.mode) {
        case "cover":
          scrollProgress = -1 * (top - viewport / 2) / elementHeight
          break;
        case "contain":
          scrollProgress = -1 * (top) / (elementHeight - viewport)
          break;
        default:
          scrollProgress = -1 * (top - viewport / 2) / elementHeight
          break;
      }

    } else {
      scrollProgress = -1 * (top - viewport / 2) / elementHeight
    }

    var normalizedScrollProgress = Math.min(Math.max(scrollProgress, 0), 1)
    // console.log(normalizedScrollProgress)
    return normalizedScrollProgress
  }

  return 0;

}