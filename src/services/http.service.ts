import Axios, { AxiosInstance } from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/'

var axios: AxiosInstance = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get(endpoint: string, data?: any) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint: string, data?: any) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint: string, data?: any) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint: string, data?: any) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(endpoint: string, method = 'GET', data: any = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    })
    return res.data
  } catch (err: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${JSON.stringify(
          data
        )}`
      )
      console.dir(err)
    }
    if (err.response && err.response.status === 401) {
      sessionStorage.clear()
    }
    throw err
  }
}
