import { expose } from '@libreservice/my-worker'

importScripts('/opencc.js')

const readyPromise = new Promise(resolve => {
  Module.onRuntimeInitialized = () => {
    resolve(null)
  }
})

expose({
  convert (config: string, text: string): string {
    return Module.ccall('convert', 'string', ['string', 'string'], [config, text])
  }
}, readyPromise)
