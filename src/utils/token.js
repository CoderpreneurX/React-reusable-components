import { jwtDecode } from 'jwt-decode'
import { client } from './api'

export function getAccessToken() {
    return localStorage.getItem('access')
}
export function getRefreshToken() {
    return localStorage.getItem('refresh')
}

export function setTokensToLocalStorage(tokens) {
    localStorage.setItem('access', tokens.access)
    localStorage.setItem('refresh', tokens.refresh)
}

export function isAccessTokenExpired() {
    const accessToken = getAccessToken()

    if (accessToken) {
        const expirationTime = jwtDecode(accessToken).exp
        const currentTime = Math.floor(Date.now() / 1000)
        return currentTime >= expirationTime
    } else {
        throw new Error('No access token found!')
    }

}

export async function refreshAccessToken() {
    const refreshToken = getRefreshToken()
    if (refreshToken !== null) {
        return client.post(
            '/api/token/refresh/',
            {
                refresh: refreshToken
            }
        ).then((response) => {
            if (response.status === 200) {
                const tokens = {
                    access: response.data.access,
                    refresh: refreshToken
                }

                setTokensToLocalStorage(tokens)

                console.log('Refreshed tokens')

                return { type: 'success' }
            } else {
                return { type: 'failure' }
            }
        })
    } else {
        return {
            type: 'failure'
        }
    }
}