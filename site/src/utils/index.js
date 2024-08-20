/**
 * Various utility functions to import here and there
 */

export const getElementIndex = (node) => {
  let index = 0
  while ((node = node.previousElementSibling)) index++
  return index
}

/**
 * simple debounce:
 *  const debounced = debounce(this.test, 1000)
 *  debounced()
 *
 *  window.addEventListener('resize', debounce(someFunction, 1000))
 *
 * @param  {Function} func function to be debounced
 * @param  {Number}   wait ms to wait, default 100
 * @return {Function} debounced function
 */
function debounce(func, wait = 100) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export { debounce }

function truncateText(text, length) {
  if (text.length > length) {
    return text.substr(0, length) + '...'
  } else {
    return text
  }
}

export { truncateText }

// Object deep equality check
const objectsAreEqual = (o1, o2) =>
  typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsAreEqual(o1[p], o2[p]))
    : o1 === o2

export { objectsAreEqual }

/**
 * Deep compare array of objects
 * @param {*} a1
 * @param {*} a2
 */
const arraysOfObjectsAreEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsAreEqual(o, a2[idx]))

export { arraysOfObjectsAreEqual }

/**
 * Simple function to determine whether
 * an element is currently in the user's viewport
 * @param  {DOM element}  el   The DOM element to test
 * @return {Boolean}
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  const docEl = document.documentElement
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || docEl.clientHeight) &&
    rect.right <= (window.innerWidth || docEl.clientWidth)
  )
}

export { isElementInViewport }

const nextFrame = () => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve()
      })
    })
  })
}

export { nextFrame }

//
//                        ,,
//     .g8"""bgd        `7MM
//   .dP'     `M          MM
//   dM'       ` ,pW"Wq.  MM  ,pW"Wq.`7MM  `7MM  `7Mb,od8 ,pP"Ybd
//   MM         6W'   `Wb MM 6W'   `Wb MM    MM    MM' "' 8I   `"
//   MM.        8M     M8 MM 8M     M8 MM    MM    MM     `YMMMa.
//   `Mb.     ,'YA.   ,A9 MM YA.   ,A9 MM    MM    MM     L.   I8
//     `"bmmmd'  `Ybmd9'.JMML.`Ybmd9'  `Mbod"YML..JMML.   M9mmmP'
//
//
const stringToHashedColour = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export { stringToHashedColour }

const invertColour = (hex, bw) => {
  function padZero(str, len) {
    len = len || 2
    const zeros = new Array(len).join('0')
    return (zeros + str).slice(-len)
  }

  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  let r = parseInt(hex.slice(0, 2), 16)
  let g = parseInt(hex.slice(2, 4), 16)
  let b = parseInt(hex.slice(4, 6), 16)
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF'
  }
  // invert color components
  r = (255 - r).toString(16)
  g = (255 - g).toString(16)
  b = (255 - b).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}

export { invertColour }
