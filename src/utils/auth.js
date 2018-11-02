import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
// const TokenKey = 'COOKIE-BEARER'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const ret = Cookies.set(TokenKey, token)
  console.log('setToken', TokenKey, token)

  return ret
}

export function removeToken() {
  console.log('removeToken', TokenKey)
  return Cookies.remove(TokenKey)
}
