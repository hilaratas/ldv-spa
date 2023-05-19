import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import authHttp from "@/authHttp";

try {
  const apiKey = process.env.VUE_APP_FB_API_KEY
  const secureUrl = process.env.VUE_APP_FB_SECURE_URL
  const refreshToken = localStorage.getItem('refresh-token')
  if (refreshToken) {
    const url = `${secureUrl}/token?key=${apiKey}`
    const payload = { refresh_token: refreshToken,  grant_type: "refresh_token" }
    authHttp.post(url, payload).then((response)=> {
      const newAccessToken = response.data.id_token
      const newRefreshToken = response.data.refresh_token
      store.commit('auth/setAccessToken',newAccessToken)
      store.commit('auth/setRefreshToken',newRefreshToken)
    })
  }
} catch(e) {
  console.log(e)
} finally {
  createApp(App).use(store).use(router).mount('#app')
}