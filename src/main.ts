import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import authHttp from "@/authHttp";

function loadApp() {
  createApp(App).use(store).use(router).mount('#app')
}


const apiKey = process.env.VUE_APP_FB_API_KEY
const secureUrl = process.env.VUE_APP_FB_SECURE_URL
const refreshToken = localStorage.getItem('refresh-token')
if (refreshToken) {
  const url = `${secureUrl}/token?key=${apiKey}`
  const payload = {refresh_token: refreshToken, grant_type: "refresh_token"}
  authHttp.post(url, payload)
    .then(
      (response) => {
        const newAccessToken = response.data.id_token
        const newRefreshToken = response.data.refresh_token
        store.commit('auth/setAccessToken', newAccessToken)
        store.commit('auth/setRefreshToken', newRefreshToken)
        return store.dispatch('profile/fetchProfile')
      },
      ()=> {
        store.commit('auth/removeAccessToken')
        store.commit('auth/removeRefreshToken')
      }
    )
    .finally(() => {
      loadApp()
    }
  )
} else {
  loadApp()
}

