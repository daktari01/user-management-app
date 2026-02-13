import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {error} from "next/dist/build/output/log";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("Request sent: ", config.method, config.url);
    const token = localStorage.getItem("token");

    if(token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("Request Error: ", error.message);
    return Promise.reject(error);
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response received: ", response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    console.error("Response Error: ", error.response?.status, error.message);
    return Promise.reject(error)
  }
)

export { api }