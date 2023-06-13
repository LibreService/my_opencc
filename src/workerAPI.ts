import { LambdaWorker, RentedBuffer } from '@libreservice/my-worker'

const worker = new LambdaWorker('./worker.js')

const convert: (config: string, text: string) => Promise<string> = worker.register('convert')

const genOcd2: (rBuf: RentedBuffer) => Promise<number> = worker.register('genOcd2')
const getFile: (content: RentedBuffer) => Promise<void> = worker.register('getFile')

const txtToOcd2 = {
  convertName (name: string) {
    const i = name.lastIndexOf('.')
    return (i >= 0 ? name.slice(0, i) : name) + '.ocd2'
  },
  async convert (buffer: ArrayBuffer) {
    const n = await genOcd2(new RentedBuffer(buffer))
    const result = new ArrayBuffer(n)
    if (n === 0) {
      return result
    }
    const ocd2 = new RentedBuffer(result)
    await getFile(ocd2)
    return ocd2.buffer
  }
}

export {
  convert,
  txtToOcd2
}
