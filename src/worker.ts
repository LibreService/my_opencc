import { loadWasm, expose } from '@libreservice/my-worker'

const readyPromise = loadWasm('opencc.js', {
  url: '__LIBRESERVICE_CDN__'
})

expose({
  convert (config: string, text: string): string {
    return Module.ccall('convert', 'string', ['string', 'string'], [config, text])
  }
}, readyPromise)
