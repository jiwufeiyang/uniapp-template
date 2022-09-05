import storage from '/@/util/storage'

export function getToken() {
  return storage.get('wxToken')
}

export function setToken(token: string) {
  storage.set('wxToken', token)
}

export function removeToken() {
  storage.remove('wxToken')
}

export function setUser(user: string) {
  storage.set('wxUserInfo', user)
}

export function getUser() {
  return storage.get('wxUserInfo')
}
