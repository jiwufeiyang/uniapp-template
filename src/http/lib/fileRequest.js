import Request from 'luch-request'
const instance = new Request({
  baseURL: 'http://192.168.3.145:3000',
  header: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use((result) => {
  return result
})

export default instance
