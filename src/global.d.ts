declare global {
  const Module: {
    ccall: (name: string, returnType: string, argsType: string[], args: any[]) => any
    FS: {
      mkdir: (path: string) => void
      lookupPath: (path: string) => void
      readFile: (path: string) => Uint8Array
      writeFile: (path: string, content: Uint8Array) => void
      lstat: (path: string) => {
        size: number
      }
    }
    _gen_ocd2: () => void
  }
}

export {}
