import { EventEmitter } from 'events'
import { isTokenExpired } from './jwt_helper'


class AuthService extends EventEmitter {

    isAuthenticated() {
        // Checks if there is a saved token and it's still valid
        const token = localStorage.getItem('token');
        if (token) {
            return !isTokenExpired(token)
        } else {
            return false
        }
    }

    isFreemium() {
        return localStorage.getItem('membership') === '0' ? true : false;
    }
    isPremium() {
        return localStorage.getItem('membership') === '1' ? true : false;
    }
    isAdmin() {
        return localStorage.getItem('membership') === '101' ? true : false;
    }

    finishAuthentication(token, membership) {
        localStorage.setItem('token', token);
        localStorage.setItem('membership', membership);
    }

    destroyAuthentication() {
        localStorage.removeItem('token');
        localStorage.removeItem('membership');
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }


    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            return error
        }
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.isAuthenticated()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        }).then(response => response.json())
    }
}
export default AuthService;