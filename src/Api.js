import axios from 'axios';
const BASE_API_URL = 'http://dev.sixmenu/api';
//const BASE_API_URL = 'http://atarit.com/api';

export default {

    // common
    getCategoriesList:(token) =>
        axios.get(`${BASE_API_URL}/common_categories`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    getProducts:(category_id, token) =>
        axios.get(`${BASE_API_URL}/category_products/${category_id}`,  {
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
    verifyEmail: (email_data) =>
        axios.post(`${BASE_API_URL}/verify_email`, email_data),
    loginUser: (user) =>
        axios.post(`${BASE_API_URL}/login_user`, user),
    completeSignupPaypalPayment:(payment_data, payment_token, auth_token) =>
        axios.post(`${BASE_API_URL}/complete_signup_payment`, payment_data, {
            headers: { 'X-CSRF-TOKEN': payment_token }
        }),


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
        }),

    // restaurant information
    getRestaurantInformation:(token) =>
        axios.get(`${BASE_API_URL}/get_restaurant`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    saveRestaurantInformation:(restaurant, token) =>
        axios.put(`${BASE_API_URL}/update_restaurant`, restaurant, {
            headers: { Authorization: `Bearer ${token}` }
        }),

    // user history
    getHistoryData:(token) =>
        axios.get(`${BASE_API_URL}/get_history`, {
            headers: { Authorization: `Bearer ${token}` }
        }),

    // user analytics
    getUserDailyAnalyticsData:(token, year, month) =>
        axios.get(`${BASE_API_URL}/get_user_daily_analytics_data/${year}/${month}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    getUserWeeklyAnalyticsData:(token, year, month) =>
        axios.get(`${BASE_API_URL}/get_user_weekly_analytics_data/${year}/${month}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    getUserMonthlyAnalyticsData:(token, year) =>
        axios.get(`${BASE_API_URL}/get_user_monthly_analytics_data/${year}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),

    // Income analytics
    getIncomeDailyAnalyticsData:(token, year, month) =>
        axios.get(`${BASE_API_URL}/get_income_daily_analytics_data/${year}/${month}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    getIncomeWeeklyAnalyticsData:(token, year, month) =>
        axios.get(`${BASE_API_URL}/get_income_weekly_analytics_data/${year}/${month}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    getIncomeMonthlyAnalyticsData:(token, year) =>
        axios.get(`${BASE_API_URL}/get_income_monthly_analytics_data/${year}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),

    // Setting
    updateEmail:(email, token) =>
        axios.put(`${BASE_API_URL}/update_email`, email, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    updatePassword:(password_info, token) =>
        axios.put(`${BASE_API_URL}/update_password`, password_info, {
            headers: { Authorization: `Bearer ${token}` }
        }),

    // Pricing
    getMembership:(token) =>
        axios.get(`${BASE_API_URL}/get_membership`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    handlePaypalPayment:(payment_data, token) =>
        axios.post(`${BASE_API_URL}/charge_paypal`, payment_data, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    completePaypalPayment:(payment_data, payment_token, auth_token) =>
        axios.post(`${BASE_API_URL}/complete_payment`, payment_data, {
            headers: { Authorization: `Bearer ${auth_token}`, 'X-CSRF-TOKEN': payment_token }
        }),
    handleCardPayment:(payment_data, token) =>
        axios.post(`${BASE_API_URL}/charge_card`, payment_data, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    handleDowngrade:(token) =>
        axios.get(`${BASE_API_URL}/downgrade_freemium`,  {
            headers: { Authorization: `Bearer ${token}` }
        }),

    // Dashboard
    getRecentData:(token) =>
        axios.get(`${BASE_API_URL}/get_recent_data`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
}
