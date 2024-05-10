import { client } from "./api";

export async function loginUser(formdata) {
    return client.post(
        '/api/token/',
        formdata
    ).then((response) => {
        switch (response.status) {
            case 200:
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