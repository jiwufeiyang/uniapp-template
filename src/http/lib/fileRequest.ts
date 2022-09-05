import Request from 'luch-request'
const instance = new Request({
  baseURL: '',
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
