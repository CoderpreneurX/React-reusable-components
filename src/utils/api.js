import axios from "axios"
import { getAccessToken } from './token'
import { isUserAuthenticated } from "./auth"

export const client = axios.create(
  {
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
  }
)

client.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()

    console.log(accessToken)
    
    if (isUserAuthenticated()) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

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