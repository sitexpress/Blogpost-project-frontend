import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:4444'
    baseURL: process.env.REACT_APP_BLOGPOST_URL
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})
export default instance