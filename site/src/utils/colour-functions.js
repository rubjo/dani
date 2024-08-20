export const HSLToRGB = (h, s, l) => {
  s /= 100
  l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [255 * f(0), 255 * f(8), 255 * f(4)]
}

export function linearFromRGB(rgb) {
  // make it decimal
  let R = rgb[0] / 255.0 // red channel decimal
  let G = rgb[1] / 255.0 // green channel decimal
  let B = rgb[2] / 255.0 // blue channel decimal
  // apply gamma
  let gamma = 2.2
  R = Math.pow(R, gamma) // linearize red
  G = Math.pow(G, gamma) // linearize green
  B = Math.pow(B, gamma) // linearize blue
  let linear = [R, G, B]
  return linear
}

export function luminanceFromLin(rgblin) {
  let Y = 0.2126 * rgblin[0] // red channel
  Y = Y + 0.7152 * rgblin[1] // green channel
  Y = Y + 0.0722 * rgblin[2] // blue channel
  return Y
}

export function luminanceFromHue(hue) {
  const rgb = HSLToRGB(hue, 100, 50)
  let lin = linearFromRGB(rgb)
  return luminanceFromLin(lin)
}
