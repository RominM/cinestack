export function useTrailerAvailability() {
  async function checkTrailerAvailable(key: string): Promise<boolean> {
    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${key}&format=json`
      )
      return res.ok
    } catch {
      return false
    }
  }

  return { checkTrailerAvailable }
}
