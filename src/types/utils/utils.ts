export const convertToAppId = (code: string, id: string) => {
  return code + id.slice(0,6).toUpperCase()
}