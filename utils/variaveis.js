const configLocal = JSON.parse(open('../config/config.local.json'))

export function pegarBaseURL() {
  const baseURL = __ENV.BASE_URL || configLocal.baseUrl
  return baseURL
}