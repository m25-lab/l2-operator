export const _try = async (promise: Promise<any>) => {
  return promise
    .then((res) => {
      return [null, res]
    })
    .catch((err) => {
      return [err, null]
    })
}
