import { LambdaWorker } from '@libreservice/my-worker'

const worker = new LambdaWorker('./worker.js')

const convert: (config: string, text: string) => Promise<string> = worker.register('convert')

export { convert }
