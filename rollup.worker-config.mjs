import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'

const isProd = process.env.NODE_ENV === 'production'

export default {
  input: 'src/worker.ts',
  output: {
    dir: 'public',
    sourcemap: !isProd,
    format: 'iife'
  },
  plugins: [
    replace({
      __LIBRESERVICE_CDN__: process.env.LIBRESERVICE_CDN || ''
    }),
    nodeResolve(),
    esbuild({
      sourceMap: !isProd,
      minify: isProd
    })
  ]
}
