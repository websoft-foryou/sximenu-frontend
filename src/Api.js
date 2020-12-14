import axios from 'axios';
const BASE_API_URL = 'http://dev.sixmenu/api';

export default {

    // common
    getCategoriesList:(token) =>
        axios.get(`${BASE_API_URL}/common_categories`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    getCommonProducts:(token) =>
        axios.get(`${BASE_API_URL}/common_products`, {
            headers: { Authorization: `Bearer ${token}` }
        }),

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
        axios.post(`${BASE_API_URL}/login_user`, user),


    // category management
    getAllCategories:(token) =>
        axios.get(`${BASE_API_URL}/categories`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    addCategory:(category, token) =>
        axios.post(`${BASE_API_URL}/add_category`, category, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    updateCategory:(category, token, id) =>
        axios.put(`${BASE_API_URL}/update_category/${id}`, category, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    removeCategory:(token, id) =>
        axios.delete(`${BASE_API_URL}/remove_category/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),


    // product management
    getAllProducts:(token) =>
        axios.get(`${BASE_API_URL}/products`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    addProduct:(product, token) =>
        axios.post(`${BASE_API_URL}/add_product`, product, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    updateProduct:(product, token, id) =>
        axios.put(`${BASE_API_URL}/update_product/${id}`, product, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    removeProduct:(token, id) =>
        axios.delete(`${BASE_API_URL}/remove_product/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
}
