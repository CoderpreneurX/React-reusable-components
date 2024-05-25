import { client } from "./api";
import { getRefreshToken, isAccessTokenExpired, refreshAccessToken, setTokensToLocalStorage, getAccessToken } from "./token";

export async function loginUser(formdata) {
    return client.post(
        '/api/token/',
        formdata
    ).then((response) => {
        switch (response.status) {
            case 200:
                const tokens = {
                    access: response.data.access,
                    refresh: response.data.refresh
                }

                setTokensToLocalStorage(tokens)

                return {
                    message: 'Log in successful, redirecting!',
                    type: 'success'
                }

            case 401:
                return {
                    message: response.data.detail,
                    type: 'failure'
                }

            case 500:
                return {
                    message: 'Some internal error occured, please try later!',
                    type: 'failure'
                }

            default:
                return {
                    message: response.data,
                    type: 'failure'
                }
        }
    })
}

export async function registerUser(formdata) {
    return client.post('/api/auth/register/', formdata).then((response) => {
        switch (response.status) {
            case 201:
                return {
                    message: 'Registration successful, please login!',
                    type: 'success'
                }

            case 400:
                return {
                    message: response.data,
                    type: 'field_error'
                }

            default:
                return {
                    message: 'Some internal error occured, please try later!',
                    type: 'failure'
                }
        }
    })
}

export async function createProfile(formdata) {
    return client.post(
        '/api/auth/profile/register/',
        formdata
    ).then((response) => {
        return response
    })
}

export function isUserAuthenticated() {
    const accessToken = getAccessToken()
    if (accessToken && !isAccessTokenExpired()) {
        return true
    } else {
        return false
    }
}

export async function getUserProfile() {
    return client.get(
        '/api/auth/profile/',
    ).then((response) => {
        if (response.status === 200) {
            return {
                profile: response.data,
                type: 'success'
            }
        } else {
            console.log(response)
            return {
                type: 'failure'
            }
        }
    })
}

export async function updateUserProfile(fd) {
    return client.put(
        '/api/auth/profile/edit/',
        fd
    ).then((response) => {
        if (response.status === 200) {
            return {
                profile: response.data,
                type: 'success'
            }
        } else {
            console.log(response)
            return {
                type: 'failure'
            }
        }
    })
}