export const verifyApiToken = (request: Request) => {
  const { API_ACCESS_TOKEN } = process.env
  const headerApiAccessToken = request.headers.get("api-access-token")
  return headerApiAccessToken && headerApiAccessToken === API_ACCESS_TOKEN
}
