import axios, {AxiosInstance} from 'axios';
import store from '@/store'
import authHttp from "@/authHttp";

const http: AxiosInstance = axios.create ({
  baseURL: process.env.VUE_APP_FB_URL
})

http.interceptors.request.use(config => {
  config.params.auth = store.getters["auth/token"]
  return config
})

http.interceptors.response.use(response => {
  return response
}, async error => {
  if(error.response.status !== 401){
    return Promise.reject(error); // ошибка, не связанная с авторизацией
  }

  const apiKey = process.env.VUE_APP_FB_API_KEY
  const secureUrl = process.env.VUE_APP_FB_SECURE_URL
  const refreshToken = store.getters['auth/refreshToken']
  const url = `${secureUrl}/token?key=${apiKey}`
  const payload = { refresh_token: refreshToken,  grant_type: "refresh_token" }

  try {
    let response = await authHttp.post(url, payload)
    const newAccessToken = response.data.id_token
    const newRefreshToken = response.data.refresh_token
    await store.commit('auth/setAccessToken',newAccessToken)
    await store.commit('auth/setRefreshToken',newRefreshToken)
    error.config.params = {
      auth: newAccessToken
    }
  } catch (e) {
  }

  return axios(error.config);
})

export default http