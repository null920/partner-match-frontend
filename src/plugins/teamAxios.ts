import axios from "axios";
import {showNotify} from "vant/es";

const isDev = process.env.NODE_ENV === 'development';

//Create a new instance of axios with a base URL and custom headers
const teamAxios = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : 'https://match-end.null920.top/api',
    withCredentials: true,
});

// Add a request interceptor
teamAxios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
teamAxios.interceptors.response.use(function (response) {
    if (response?.data?.code === 40100 || response?.data.desc === '未登录') {
        // 防止重复加后缀
        if (window.location.pathname !== '/user/login') {
            showNotify({type: 'danger', message: '用户未登录或登录已过期', duration: 1000});
            // Handle 50000 error code here
            setTimeout(() => {
                const redirectUrl = encodeURIComponent(window.location.href);
                window.location.href = `/user/login?redirect=${redirectUrl}`;
            }, 1200);
        }
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default teamAxios;