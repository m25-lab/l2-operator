export const socketResponse = (
  client: any,
  action: string,
  data: any,
  error = null,
) => {
  client.send(
    JSON.stringify({
      success: error === null,
      error,
      action,
      data,
    }),
  )
}
