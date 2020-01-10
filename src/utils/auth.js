import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const CityKey = 'citys'


export function getToken() {
  return Cookies.get(TokenKey)
}
export function getCity() {
  return Cookies.get(CityKey)
}

export function setCity(token) {
  return Cookies.set(CityKey, token)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
