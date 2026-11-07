import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: 
    {
        'X-Custom-Header': 'foobar'
    }
})



axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    return Promise.reject(error)
});

axiosInstance.interceptors.response.use(function (response) {
    console.log(response.data, "dataaaaaaaaaaaaaa");
    
    return response
}, function (error) {
    return Promise.reject(error)
});