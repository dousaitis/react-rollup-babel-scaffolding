import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      babelrc: false,
      exclude: [
        'node_modules/**',
        '**/*.scss'
      ],
      presets: [['es2015', { loose: true, modules: false }], 'stage-1', 'react'],
      plugins: [['external-helpers']]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    scss({
      output: 'dist/style.css'
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: '',
      historyApiFallback: false,
      host: 'localhost',
      port: 3002
    }),
    livereload('dist')
  ],
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
}

