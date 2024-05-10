import axios from "axios"
// import {accessToken, validateToken} from './token'

export const client = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000',
        withCredentials: true
    }
)

client.interceptors.request.use(
    (config) => {
        // validateToken()
        // config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.resolve(error.response)
  }
);