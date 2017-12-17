import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

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
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    scss({
      output: 'dist/style-min.css'
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    uglify(),
    filesize(),
  ],
  output: {
    file: 'dist/bundle-min.js',
    format: 'iife',
    sourcemap: true
  },
}

