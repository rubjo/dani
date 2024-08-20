import { useStore } from '../store'
import { luminanceFromHue } from './colour-functions'

//
//                         ,,    ,,    ,,          ,,
//   `7MMF'   `7MF' mm     db  `7MM    db   mm     db
//     MM       M   MM           MM         MM
//     MM       M mmMMmm `7MM    MM  `7MM mmMMmm `7MM  .gP"Ya  ,pP"Ybd
//     MM       M   MM     MM    MM    MM   MM     MM ,M'   Yb 8I   `"
//     MM       M   MM     MM    MM    MM   MM     MM 8M"""""" `YMMMa.
//     YM.     ,M   MM     MM    MM    MM   MM     MM YM.    , L.   I8
//      `bmmmmd"'   `Mbmo.JMML..JMML..JMML. `Mbmo.JMML.`Mbmmd' M9mmmP'
//
//
// Contrast scale: to avoid everything being grayish when the theme slider is
// mid-range, some colours cannot be linear, but make a sudden jump midway.
// Example:
//
//COMPUTED VALUE
//
// 100% |                       *                      *
//      |                           *             *
//      |                                  *
//      |
//      |
//      |          *
//      |     *         *
//      |*                   *
// 0%   ************************************************
//       0%                                          100%   SLIDER

// 0-15
const bumpScale = (x) => {
  return Math.round(-2.4 * Math.pow(10, -2) * Math.pow(x, 2) + 1.2 * x)
}

const bumpNumber = (x) => {
  if (x <= 49) {
    return bumpScale(x)
  } else {
    return 100 - bumpScale(100 - x)
  }
}

// Kudos: https://www.trysmudford.com/blog/linear-interpolation-functions/
const lerp = (x, y, a) => x * (1 - a) + y * a
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a))
const invlerp = (x, y, a) => clamp((a - x) / (y - x))
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a))

const invert = (x) => {
  return 100 - x
}

// Darkens a colour
const darken = (x, amount) => {
  return range(0, 100, 0, 100, x - amount)
}

// Lighthens a colour
const lighten = (x, amount) => {
  return range(0, 100, 0, 100, x + amount)
}

// Strengthens a colour, ie. adjusts it towards 0 or 100 by a amount of 0 - 100
// ie. if theme is light, augment always makes things lighter
const augment = (x, amount) => {
  if (x <= 49) {
    return range(0, 50, 0, 50, x - amount)
  } else {
    return range(51, 100, 51, 100, x + amount)
  }
}

// Weakens a colour, ie. adjusts it up or down towards 50 by a amount of 0 - 100

// Nudges a number towards a goal. How much depends on amount.
// Produces less difference as value approaches extremes
const adjust = (x, amount, direction) => {
  direction = direction || x <= 49 ? 'down' : 'up'
  const distanceFromAbsolute = 50 - Math.abs(50 - x)
  return direction === 'up'
    ? x + (amount * distanceFromAbsolute) / 50
    : x - (amount * distanceFromAbsolute) / 50
}

const easeInSine = (x) => {
  x /= 100
  const tmp = 1 - Math.cos((x * Math.PI) / 2)
  return tmp * 100
}

const easeInQuad = (x) => {
  x /= 100
  const tmp = x * x
  return tmp * 100
}

const easeInOutCubic = (x) => {
  x /= 100
  const tmp = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
  return tmp * 100
}

// For text and other elements which need an amount of contrast against background
const dynamicContrastHSL = (lux, h, s, l) => {
  return `hsl(${h}, ${s + lux / 10}%, ${invert(augment(lux, -l))}%)`
}

const shift = (int) => {
  if (int > 360) return int - 361
  if (int < 0) return 360 + int
  return int
}

//
//                         ,,                       ,,
//     .g8"""bgd         `7MM                     `7MM           mm
//   .dP'     `M           MM                       MM           MM
//   dM'       ` ,6"Yb.    MM  ,p6"bo `7MM  `7MM    MM   ,6"Yb.mmMMmm .gP"Ya
//   MM         8)   MM    MM 6M'  OO   MM    MM    MM  8)   MM  MM  ,M'   Yb
//   MM.         ,pm9MM    MM 8M        MM    MM    MM   ,pm9MM  MM  8M""""""
//   `Mb.     ,'8M   MM    MM YM.    ,  MM    MM    MM  8M   MM  MM  YM.    ,
//     `"bmmmd' `Moo9^Yo..JMML.YMbmd'   `Mbod"YML..JMML.`Moo9^Yo.`Mbmo`Mbmmd'
//
//

function calculateVar(variable) {
  const store = useStore()

  const paletteModel = store.paletteModel
  const hue = store.hue
  const sat = store.sat
  const lux = store.lux

  const bumped = bumpNumber(lux)

  const satFactor = sat / 100 + 1

  //
  //                         ,,                                               ,,
  //   `7MM"""Yp,          `7MM                                             `7MM
  //     MM    Yb            MM                                               MM
  //     MM    dP  ,6"Yb.    MM   ,6"Yb.  `7MMpMMMb.  ,p6"bo   .gP"Ya    ,M""bMM
  //     MM"""bg. 8)   MM    MM  8)   MM    MM    MM 6M'  OO  ,M'   Yb ,AP    MM
  //     MM    `Y  ,pm9MM    MM   ,pm9MM    MM    MM 8M       8M"""""" 8MI    MM
  //     MM    ,9 8M   MM    MM  8M   MM    MM    MM YM.    , YM.    , `Mb    MM
  //   .JMMmmmd9  `Moo9^Yo..JMML.`Moo9^Yo..JMML  JMML.YMbmd'   `Mbmmd'  `Wbmd"MML.
  //
  //
  if (paletteModel === 'balanced') {
    switch (variable) {
      case 'primary':
        return { h: hue, s: 50 * satFactor - 12.5, l: 57, a: 100 }
      case 'primary-invert-bw':
        return { h: 0, s: 0, l: luminanceFromHue(hue) < 0.4 ? 100 : 0, a: 100 }
      case 'bg-primary':
        return { h: hue, s: 20 * satFactor - 17, l: adjust(lux, 10), a: 100 }
      case 'bg-secondary':
        return { h: hue, s: 20 * satFactor - 17, l: adjust(lux, 40), a: 100 }
      case 'bg-menu-primary':
        return { h: hue, s: 20 * satFactor - 17, l: augment(lux, 10), a: 100 }
      case 'bg-menu-primary-hover':
        return { h: hue, s: 20 * satFactor - 17, l: adjust(lux, 5), a: 100 }
      case 'bg-menu-secondary':
        return { h: hue, s: 20 * satFactor - 17, l: adjust(lux, -35), a: 100 }
      case 'bg-menu-secondary-hover':
        return { h: hue, s: 20 * satFactor - 17, l: adjust(lux, 30), a: 100 }
      case 'high-contrast':
        return {
          h: hue,
          s: 20 * satFactor - 17,
          l: 100 - adjust(lux, 50),
          a: 100,
        }
      case 'low-contrast':
        return {
          h: hue,
          s: 20 * satFactor - 17,
          l: 100 - augment(lux, 7.5),
          a: 100,
        }
      case 'lowest-contrast':
        return {
          h: hue,
          s: 20 * satFactor - 17,
          l: 100 - augment(lux, 2.5),
          a: 100,
        }
      case 'text-primary':
        return { h: hue, s: 20 * satFactor - 17, l: 100 - bumped, a: 100 }
      case 'highlight':
        return { h: hue, s: 20 * satFactor - 17, l: adjust(lux, 15), a: 100 }
      case 'ui-element':
        return { h: hue, s: 20 * satFactor - 17, l: augment(lux, 15), a: 100 }
      case 'ui-element-border':
        return {
          h: hue,
          s: 20 * satFactor - 17,
          l: 100 - lux,
          a: Math.abs(50 - lux),
        }
      case 'ui-element-hover':
        return { h: hue, s: 20 * satFactor - 17, l: augment(lux, 20), a: 100 }
      case 'ui-overlay':
        return { h: hue, s: 20 * satFactor - 17, l: adjust(lux, 10), a: 100 }
      case 'code-text-primary':
        return { h: hue, s: 20 * satFactor - 17, l: 100 - bumped, a: 100 }
      case 'code-bg-primary':
        return { h: hue, s: 20 * satFactor - 17, l: augment(lux, 10), a: 100 }
      case 'code-selection-bg':
        return { h: hue, s: 20 * satFactor - 17, l: 100 - bumped, a: 15 }
      case 'code-keyword':
        return {
          h: shift(hue + 100),
          s: 18 * satFactor - 10 + lux / 10,
          l: invert(augment(lux, -15)),
          a: 100,
        }
      case 'code-keyword-glow':
        return {
          h: shift(hue + 100),
          s: 20 + lux / 10,
          l: invert(augment(lux, -100)),
          a: 0,
        }
      case 'code-name':
        return {
          h: hue,
          s: 25 * satFactor - 10 + lux / 10,
          l: invert(augment(lux, -15)),
          a: 100,
        }
      case 'code-function-name':
        return {
          h: shift(hue - 20),
          s: 25 * satFactor - 15 + lux / 10,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-function-name-glow':
        return {
          h: shift(hue - 20),
          s: 25 + lux / 10,
          l: invert(augment(lux, -100)),
          a: 0,
        }
      case 'code-constant':
        return {
          h: shift(hue + 100),
          s: 15 * satFactor - 10 + lux / 10,
          l: invert(augment(lux, -35)),
          a: 100,
        }
      case 'code-type-class':
        return {
          h: shift(hue - 145),
          s: 40 * satFactor - 20 + lux / 10,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-matching-bracket-glow':
        return {
          h: 0,
          s: 0,
          l: 0,
          a: 0,
        }
      case 'code-comment':
        return { h: hue, s: lux / 10, l: invert(augment(lux, -90)), a: 100 }
      case 'code-link':
        return {
          h: hue,
          s: 20 * satFactor - 10 + lux / 10,
          l: invert(augment(lux, -15)),
          a: 100,
        }
      case 'code-boolean':
        return {
          h: shift(hue - 180),
          s: 20 * satFactor - 5 + lux / 10,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-string':
        return {
          h: shift(hue - 100),
          s: 20 * satFactor - 15 + lux / 10,
          l: invert(augment(lux, -15)),
          a: 100,
        }
      case 'code-invalid':
        return {
          h: hue,
          s: 40 * satFactor - 20 + lux / 10,
          l: invert(augment(lux, -5)),
          a: 100,
        }
      case 'code-tooltip':
        return { h: hue, s: 0, l: augment(lux, 15), a: 100 }
      default:
        return { h: hue, s: 0, l: 100, a: 100 }
    }
  }

  //
  //
  //   `7MN.   `7MF'
  //     MMN.    M
  //     M YMb   M  .gP"Ya   ,pW"Wq.`7MMpMMMb.
  //     M  `MN. M ,M'   Yb 6W'   `Wb MM    MM
  //     M   `MM.M 8M"""""" 8M     M8 MM    MM
  //     M     YMM YM.    , YA.   ,A9 MM    MM
  //   .JML.    YM  `Mbmmd'  `Ybmd9'.JMML  JMML.
  //
  //
  if (paletteModel === 'neon') {
    switch (variable) {
      case 'primary':
        return { h: hue, s: 50 * satFactor, l: 57, a: 100 }
      case 'primary-invert-bw':
        return { h: 0, s: 0, l: luminanceFromHue(hue) < 0.4 ? 100 : 0, a: 100 }
      case 'bg-primary':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: adjust(lux, 16),
          a: 100,
        }
      case 'bg-secondary':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: adjust(lux, 40),
          a: 100,
        }
      case 'bg-menu-primary':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: augment(lux, 10),
          a: 100,
        }
      case 'bg-menu-primary-hover':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: adjust(lux, 25),
          a: 100,
        }
      case 'bg-menu-secondary':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: adjust(lux, -35),
          a: 100,
        }
      case 'bg-menu-secondary-hover':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: adjust(lux, 30),
          a: 100,
        }
      case 'high-contrast':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: 100 - adjust(lux, 50),
          a: 100,
        }
      case 'low-contrast':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: 100 - adjust(lux, 10),
          a: 100,
        }
      case 'lowest-contrast':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: 100 - adjust(lux, 5),
          a: 100,
        }
      case 'text-primary':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: 100 - bumped,
          a: 100,
        }
      case 'highlight':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: adjust(lux, 15),
          a: 100,
        }
      case 'ui-element':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: augment(lux, 15),
          a: 100,
        }
      case 'ui-element-border':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: 100 - lux,
          a: Math.abs(50 - lux),
        }
      case 'ui-element-hover':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: augment(lux, 20),
          a: 100,
        }
      case 'ui-overlay':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: adjust(lux, 10),
          a: 100,
        }
      case 'code-text-primary':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: 100 - bumped,
          a: 100,
        }
      case 'code-bg-primary':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: augment(lux, 8),
          a: 100,
        }
      case 'code-selection-bg':
        return { h: hue, s: 20 * satFactor - 17, l: 100 - bumped, a: 15 }
      case 'code-keyword':
        return {
          h: shift(hue + 130),
          s: 20 * satFactor * satFactor,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-keyword-glow':
        return {
          h: shift(hue + 130),
          s: 25 * satFactor * satFactor,
          l: 70,
          a: 65 - lux / 5,
        }
      case 'code-name':
        return {
          h: shift(hue - 40),
          s: 55 * satFactor * satFactor,
          l: invert(augment(lux, -2)),
          a: 100,
        }
      case 'code-function-name':
        return {
          h: shift(hue + 40),
          s: 30 * satFactor * satFactor,
          l: invert(augment(lux, -22)),
          a: 100,
        }
      case 'code-function-name-glow':
        return {
          h: shift(hue + 40),
          s: 25 * satFactor * satFactor,
          l: 70,
          a: 65 - lux / 5,
        }
      case 'code-constant':
        return {
          h: shift(hue + 100),
          s: 5 * satFactor * satFactor,
          l: invert(augment(lux, -35)),
          a: 100,
        }
      case 'code-type-class':
        return {
          h: shift(hue + 190),
          s: 20 * satFactor * satFactor,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-matching-bracket-glow':
        return { h: hue, s: lux / 10, l: invert(augment(lux, 100)), a: 70 }
      case 'code-comment':
        return { h: hue, s: lux / 10, l: invert(augment(lux, -30)), a: 100 }
      case 'code-link':
        return {
          h: hue,
          s: 10 * satFactor * satFactor,
          l: invert(augment(lux, -15)),
          a: 100,
        }
      case 'code-boolean':
        return {
          h: shift(hue + 80),
          s: 35 * satFactor * satFactor,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-string':
        return {
          h: shift(hue - 100),
          s: 20 * satFactor * satFactor,
          l: invert(augment(lux, -10)),
          a: 100,
        }
      case 'code-invalid':
        return {
          h: hue,
          s: 30 * satFactor * satFactor,
          l: invert(augment(lux, -5)),
          a: 100,
        }
      case 'code-tooltip':
        return { h: hue, s: 0, l: augment(lux, 15), a: 100 }
      default:
        return { h: hue, s: 0, l: 100, a: 100 }
    }
  }

  //                                                                   ,,
  //   `7MM"""Yb.                                               mm     db
  //     MM    `Yb.                                             MM
  //     MM     `Mb `7Mb,od8 ,6"Yb.  `7MMpMMMb.pMMMb.   ,6"Yb.mmMMmm `7MM  ,p6"bo
  //     MM      MM   MM' "'8)   MM    MM    MM    MM  8)   MM  MM     MM 6M'  OO
  //     MM     ,MP   MM     ,pm9MM    MM    MM    MM   ,pm9MM  MM     MM 8M
  //     MM    ,dP'   MM    8M   MM    MM    MM    MM  8M   MM  MM     MM YM.    ,
  //   .JMMmmmdP'   .JMML.  `Moo9^Yo..JMML  JMML  JMML.`Moo9^Yo.`Mbmo.JMML.YMbmd'
  //
  //
  if (paletteModel === 'dramatic') {
    switch (variable) {
      case 'primary':
        return { h: hue, s: 50 * satFactor, l: 57, a: 100 }
      case 'primary-invert-bw':
        return { h: 0, s: 0, l: luminanceFromHue(hue) < 0.4 ? 100 : 0, a: 100 }
      case 'bg-primary':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: lux,
          a: 100,
        }
      case 'bg-secondary':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: adjust(lux, 20),
          a: 100,
        }
      case 'bg-menu-primary':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: augment(lux, 2),
          a: 100,
        }
      case 'bg-menu-primary-hover':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: lux,
          a: 100,
        }
      case 'bg-menu-secondary':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: adjust(lux, -35),
          a: 100,
        }
      case 'bg-menu-secondary-hover':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: adjust(lux, 30),
          a: 100,
        }
      case 'high-contrast':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: 100 - adjust(lux, 50),
          a: 100,
        }
      case 'low-contrast':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: 100 - adjust(lux, 10),
          a: 100,
        }
      case 'lowest-contrast':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: 100 - adjust(lux, 5),
          a: 100,
        }
      case 'text-primary':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: 100 - bumped,
          a: 100,
        }
      case 'highlight':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: adjust(lux, 15),
          a: 100,
        }
      case 'ui-element':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: augment(lux, 15),
          a: 100,
        }
      case 'ui-element-border':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: 100 - lux,
          a: Math.abs(50 - lux),
        }
      case 'ui-element-hover':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: augment(lux, 20),
          a: 100,
        }
      case 'ui-overlay':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: adjust(lux, 10),
          a: 100,
        }
      case 'code-text-primary':
        return {
          h: shift(hue - 105),
          s: 20 * satFactor - 5,
          l: 100 - bumped,
          a: 100,
        }
      case 'code-bg-primary':
        return {
          h: shift(hue - 105),
          s: 23 * satFactor - 5,
          l: augment(lux, -3),
          a: 100,
        }
      case 'code-selection-bg':
        return { h: hue, s: 20 * satFactor - 17, l: 100 - bumped, a: 15 }
      case 'code-keyword':
        return {
          h: hue,
          s: 65 * satFactor + lux / 10,
          l: invert(augment(lux, -20)),
          a: 100,
        }
      case 'code-keyword-glow':
        return {
          h: 0,
          s: 0,
          l: 0,
          a: 0,
        }
      case 'code-name':
        return {
          h: shift(hue - 65),
          s: 44 * satFactor + lux / 10,
          l: invert(augment(lux, -20)),
          a: 100,
        }
      case 'code-function-name':
        return {
          h: shift(hue + 145),
          s: 45 * satFactor + lux / 10,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-function-name-glow':
        return {
          h: 0,
          s: 0,
          l: 0,
          a: 0,
        }
      case 'code-constant':
        return {
          h: shift(hue + 120),
          s: 25 * satFactor - 5 + lux / 10,
          l: invert(augment(lux, -35)),
          a: 100,
        }
      case 'code-type-class':
        return {
          h: shift(hue + 215),
          s: 90 * satFactor - 15 + lux / 10,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-matching-bracket-glow':
        return {
          h: 0,
          s: 0,
          l: 50,
          a: 100,
        }
      case 'code-comment':
        return {
          h: shift(hue - 105),
          s: 10 * satFactor + lux / 5,
          l: augment(lux, -35),
          a: 100,
        }
      case 'code-link':
        return {
          h: hue,
          s: 40 * satFactor - 5 + lux / 10,
          l: invert(augment(lux, -15)),
          a: 100,
        }
      case 'code-boolean':
        return {
          h: shift(hue + 60),
          s: 75 * satFactor + lux / 10,
          l: invert(augment(lux, -25)),
          a: 100,
        }
      case 'code-string':
        return {
          h: shift(hue + 100),
          s: 60 * satFactor - 10 + lux / 10,
          l: invert(augment(lux, -20)),
          a: 100,
        }
      case 'code-invalid':
        return {
          h: hue,
          s: 60 * satFactor - 15 + lux / 10,
          l: invert(augment(lux, -5)),
          a: 100,
        }
      case 'code-tooltip':
        return { h: hue, s: 0, l: augment(lux, 15), a: 100 }
      default:
        return { h: hue, s: 0, l: 100, a: 100 }
    }
  }
}

function setVar(v) {
  const { h, s, l, a } = calculateVar(v)
  document.documentElement.style.setProperty(
    '--' + v,
    `hsla(${h}, ${s}%, ${l}%, ${a}%)`,
  )
}

function setFixedVar(v, val) {
  document.documentElement.style.setProperty('--' + v, val)
}

//
//                                         ,,
//    .M"""bgd           mm         mm   `7MM
//   ,MI    "Y           MM         MM     MM
//   `MMb.      .gP"Ya mmMMmm     mmMMmm   MMpMMMb.  .gP"Ya `7MMpMMMb.pMMMb.  .gP"Ya
//     `YMMNq. ,M'   Yb  MM         MM     MM    MM ,M'   Yb  MM    MM    MM ,M'   Yb
//   .     `MM 8M""""""  MM         MM     MM    MM 8M""""""  MM    MM    MM 8M""""""
//   Mb     dM YM.    ,  MM         MM     MM    MM YM.    ,  MM    MM    MM YM.    ,
//   P"Ybmmd"   `Mbmmd'  `Mbmo      `Mbmo.JMML  JMML.`Mbmmd'.JMML  JMML  JMML.`Mbmmd'
//
//

export function setTheme() {
  const store = useStore()

  // Primary gradient
  let baseSat
  switch (store.paletteModel) {
    case 'balanced':
      baseSat = 50
      break
    case 'neon':
      baseSat = 70
      break
    case 'dramatic':
      baseSat = 80
      break
  }

  const sat = baseSat + (store.sat - 50) / 4
  document.documentElement.style.setProperty(
    '--primary-gradient',
    `linear-gradient(135deg, hsl(${shift(
      store.hue - 12,
    )}, ${sat}%, 60%), hsl(${shift(store.hue + 12)}, ${sat}%, 57%))`,
  )

  setVar('primary')
  setVar('primary-invert-bw')
  setVar('bg-primary')
  setVar('bg-secondary')
  setVar('bg-menu-primary')
  setVar('bg-menu-primary-hover')
  setVar('bg-menu-secondary')
  setVar('bg-menu-secondary-hover')
  setVar('high-contrast')
  setVar('low-contrast')
  setVar('lowest-contrast')
  setVar('text-primary')
  setVar('highlight')
  setVar('ui-element')
  setVar('ui-element-border')
  setVar('ui-element-hover')
  setVar('ui-overlay')
  setVar('code-text-primary')
  setVar('code-bg-primary')
  setVar('code-selection-bg')
  setVar('code-keyword')
  setVar('code-keyword-glow')
  setVar('code-name')
  setVar('code-function-name')
  setVar('code-function-name-glow')
  setVar('code-constant')
  setVar('code-type-class')
  setVar('code-matching-bracket-glow')
  setVar('code-comment')
  setVar('code-link')
  setVar('code-boolean')
  setVar('code-string')
  setVar('code-invalid')
  setVar('code-tooltip')

  setFixedVar('code-searchmatch-bg', 'var(--bg-primary)')
  setFixedVar('code-searchmatch-outline', 'var(--low-contrast)')
  setFixedVar('code-searchmatch-selected', 'rgba(125, 125, 125, 0.05)')
  setFixedVar('code-activeline-bg', 'rgba(125, 125, 125, 0.05)')
  setFixedVar('code-fold-placeholder', 'var(--darkgray)')
}
