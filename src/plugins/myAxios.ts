import axios from "axios";
import {showNotify} from "vant/es";

//Create a new instance of axios with a base URL and custom headers
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    if (response?.data?.code === 50000) {
        showNotify({type: 'danger', message: '用户未登录或登录已过期', duration: 1000});
        // Handle 50000 error code here
        setTimeout(() => {
            const redirectUrl = encodeURIComponent(window.location.href);
            window.location.href = `/user/login?redirect=${redirectUrl}`;
        }, 1200);
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default myAxios;