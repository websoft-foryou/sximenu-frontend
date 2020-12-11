import axios from 'axios';
const BASE_API_URL = 'http://dev.sixmenu/api';

export default {

    // user management
    getAllUsers:() =>
        axios.get(BASE_API_URL + '/users'),
    getOneUser: (id) =>
        axios.get(`${BASE_API_URL}/users/${id}/edit`),
    addUser: (user) =>
        axios.post(`${BASE_API_URL}/add_user`, user),
    updateUser: (user, id) =>
        axios.put(`${BASE_API_URL}/users/${id}`, user),
    deleteUser: (id) =>
        axios.delete(`${BASE_API_URL}/users/${id}`),
    verifyEmail: (token) =>
        axios.post(`${BASE_API_URL}/verify_email`, token),
    loginUser: (user) =>
        axios.post(`${BASE_API_URL}/login_user`, user)

}
