import { client } from "./api";
import { accessToken, isAccessTokenExpired, refreshAccessToken, setTokensToLocalStorage } from "./token";

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
    return client.post(
        '/api/auth/register/',
        formdata
    ).then((response) => {
        switch (response.status) {
            case 201:
                return {
                    message: 'User created successfully, please login!',
                    type: 'success'
                }

            case 400:
                return {
                    message: response.data,
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

export async function createProfile(formdata) {
    return client.post(
        '/api/auth/profile/register/',
        formdata
    ).then((response) => {
        return response
    })
}

export async function isUserAuthenticated() {
    if (accessToken && !isAccessTokenExpired()) {
        return true
    } else {
        const response = await refreshAccessToken()

        if (response.type === 'success') {
            return true
        } else {
            return false
        }
    }
}

export async function getUserProfile() {
    return client.get(
        '/api/auth/profile/'
    ).then((response) => {
        console.log('Auth profile', response)
        if (response.status === 200) {
            return {
                profile: response.data,
                type: 'success',
            }
        } else {
            return {
                type: 'failure'
            }
        }
    })
}