export const shortenString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str
  }
  const shortenedString = str.substring(0, maxLength)
  const lastSpaceIndex = shortenedString.lastIndexOf(' ')
  if (lastSpaceIndex === -1) {
    return shortenedString + '...'
  }
  return shortenedString.substring(0, lastSpaceIndex) + '...'
}
