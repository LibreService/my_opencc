declare global {
  const Module: {
    ccall: (name: string, returnType: string, argsType: string[], args: any[]) => any
  }
}

export {}
