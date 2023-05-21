export const truncate = (
  text: string,
  maxLength: number,
  minWordLength = 3,
): string => {
  let result = ''
  const words = text.trim().split(' ')

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const shouldHasWhiteSpace = i !== 0
    const nextWord = `${shouldHasWhiteSpace ? ' ' : ''}${word}`

    result += nextWord
    const isNextResultOverLength = result.length >= maxLength

    if (word.length >= minWordLength && isNextResultOverLength) {
      break
    }
  }

  const shouldHasEllipsis = result.length < text.length

  return result + (shouldHasEllipsis ? '...' : '')
}
