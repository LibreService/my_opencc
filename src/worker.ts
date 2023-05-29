import { loadWasm, expose } from '@libreservice/my-worker'
import { LazyCache } from '@libreservice/lazy-cache'
import { version } from '../package.json'

const openccPath = '/usr/local/share/opencc'
const prefix = ('__LIBRESERVICE_CDN__' || './') + 'opencc'

const lazyCache = new LazyCache('config')

const readyPromise = loadWasm('opencc.js', {
  url: '__LIBRESERVICE_CDN__',
  init () {
    for (const path of ['/usr', '/usr/local', '/usr/local/share', openccPath]) {
      Module.FS.mkdir(path)
    }
  }
})

async function loadFile (file: string, read?: boolean): Promise<string> {
  const path = `${openccPath}/${file}`
  let u8array: Uint8Array
  try {
    Module.FS.lookupPath(path)
    if (read) {
      u8array = Module.FS.readFile(path)
    }
  } catch {
    const url = `${prefix}/${file}`
    u8array = new Uint8Array(await lazyCache.get(file, version, url))
    Module.FS.writeFile(path, u8array)
  }
  if (read) {
    return new TextDecoder('utf-8', { fatal: true }).decode(u8array!)
  }
  return ''
}

async function loadConfig (config: string) {
  const content = await loadFile(config, true)
  const obj = JSON.parse(content)
  const files = [obj.segmentation.dict.file]
  const load = (file: string) => !files.includes(file) && files.push(file)
  for (const { dict } of obj.conversion_chain) {
    const { file, dicts } = dict
    file && load(file)
    if (dicts) {
      for (const { file } of dicts) {
        load(file)
      }
    }
  }
  return Promise.all(files.map(file => loadFile(file)))
}

expose({
  async convert (config: string, text: string): Promise<string> {
    await loadConfig(config)
    return Module.ccall('convert', 'string', ['string', 'string'], [config, text])
  }
}, readyPromise)
