import { babel } from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import terser from '@rollup/plugin-terser'
import scss from 'rollup-plugin-scss'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import del from 'rollup-plugin-delete'

const config = {
  input: 'src/index.js',
  output: {
    dir: `dist/`,
    format: 'esm',
  },
  plugins: [
    del({ targets: 'dist/*' }),
    scss({
      output: false,
    }),
    dynamicImportVars(),
    eslint(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    process.env.production === 'on' && terser(),
  ],
}

export default config
