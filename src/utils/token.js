import { jwtDecode } from 'jwt-decode'
import { client } from './api'

export const accessToken = localStorage.getItem('access')
export const refreshToken = localStorage.getItem('refresh')

export function setTokensToLocalStorage(tokens) {
    localStorage.setItem('access', tokens.access)
    localStorage.setItem('refresh', tokens.refresh)
}

export function isAccessTokenExpired() {
    const expirationTime = jwtDecode(accessToken).exp
    const currentTime = Math.floor(Date.now() / 1000)

    return currentTime >= expirationTime
}

export async function refreshAccessToken() {
    if (refreshToken) {
        return client.post(
            '/api/token/refresh/',
            { refresh: refreshToken }
        ).then((response) => {
            if (response.status === 200) {
                const tokens = {
                    access: response.data.access,
                    refresh: refreshToken,
                }
                setTokensToLocalStorage(tokens)

                console.log('Token refreshed')

                return {
                    type: 'success'
                }
            }
        })
    } else {
        return {
            type: 'failure'
        }
    }
}