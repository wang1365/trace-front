import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
// const TokenKey = 'COOKIE-BEARER'

export function getToken() {
  const ck = Cookies.get(TokenKey)
  return ck
}

export function setToken(token) {
  const ret = Cookies.set(TokenKey, token)
  console.log('setToken', TokenKey, token)
  console.log('get All cookie:', Cookies.get())

  return ret
}

export function removeToken() {
  console.log('removeToken', TokenKey)
  return Cookies.remove(TokenKey)
}
