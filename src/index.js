// The entry point for your JS library. Organise imports and exports here.

// A function for testing using Vitest - see index.test.js / npm run test
export const sum = (a, b) => {
  return a + b
}

// A simple demo library to zoom an image on hover and mousedown:

export default class SimpleZoom {
  constructor(
    className,
    options = { hoverScale: '200%', clickScale: '1000%' },
  ) {
    this.domEl = document.querySelector(className)
    this.options = options
    this.activeScale = this.options.hoverScale
    if (!this.domEl) throw new Error('Element ' + className + ' not found')

    this.domEl.classList.add('active')
    this.domEl.simpleZoom = this

    // So this doesn't work particularly well on mobile, but meh
    this.domEl.addEventListener('mousemove', this.zoom)
    this.domEl.addEventListener('mousedown', this.doubleZoomOn)
    this.domEl.addEventListener('mouseup', this.doubleZoomOff)
  }

  zoom = (e) => {
    const offsetX = e.offsetX
    const offsetY = e.offsetY
    const x = (offsetX / this.domEl.offsetWidth) * 100
    const y = (offsetY / this.domEl.offsetHeight) * 100
    this.domEl.style.backgroundSize = this.activeScale
    this.domEl.style.backgroundPosition = x + '% ' + y + '%'
  }

  doubleZoomOn = (e) => {
    this.activeScale = this.options.clickScale
    this.zoom(e)
  }

  doubleZoomOff = (e) => {
    this.activeScale = this.options.hoverScale
    this.zoom(e)
  }

  destroy() {
    this.domEl.classList.remove('active')
    this.domEl.removeEventListener('mousemove', this.zoom)
    this.domEl.removeEventListener('mousedown', this.doubleZoomOn)
    this.domEl.removeEventListener('mouseup', this.doubleZoomOff)
  }
}
