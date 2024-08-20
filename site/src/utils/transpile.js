import * as Babel from '@babel/standalone'

const babelOptions = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: ['last 1 versions', 'not dead', '>1%'],
        },
      },
    ],
  ],
}

export default function (str) {
  const { code } = Babel.transform(str, babelOptions)

  return code
}
