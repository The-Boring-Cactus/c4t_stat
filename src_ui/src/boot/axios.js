import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$axios = axios

const axiosInstance = axios.create({
    paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    baseURL: process.env.NODE_ENV === 'production'
      ? '/'
      : 'http://localhost/'
})

const setErrorInterceptor = (errorFunction) => {
    axiosInstance.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (!error.response) {
            errorFunction()
        }
        return Promise.reject(error)
    })
}

const setBaseURL = (baseURL) => {
    axiosInstance.defaults.baseURL = baseURL
}

Vue.prototype.$axios = axiosInstance

export { axiosInstance, setErrorInterceptor, setBaseURL }
