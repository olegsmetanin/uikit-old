export const delay = <T>(res: T, timeout: number): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res)
    }, timeout)
  })
}

export default delay