export const getFileExtension = (filename: string): string => {
  const paths = (filename ?? '').split('.')

  return paths[paths.length - 1]
}
