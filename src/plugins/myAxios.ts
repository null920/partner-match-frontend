import axios from "axios";

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
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default myAxios;