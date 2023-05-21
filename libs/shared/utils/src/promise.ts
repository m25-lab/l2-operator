export const callActionWithTimeout = (
  action: () => Promise<any>,
  timeout: number,
): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    const timer = timeout
      ? setTimeout(() => {
          reject()
        }, timeout)
      : null

    try {
      const actionResult = await action()
      timer && clearTimeout(timer)
      resolve(actionResult)
    } catch (error) {
      timer && clearTimeout(timer)
      reject(error)
    }
  })
}
