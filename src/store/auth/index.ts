import {Module} from "vuex";
import {RootState} from "@/store/types";
import {authState, fbPayload} from './types'
import http from "@/http";
import {AuthInfo} from "@/typings";
import {getJWTPayload, setTokens} from "@/utils/token"


export const auth: Module<authState, RootState> = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('jwt-token'),
    user: null
  }),
  getters: {
    token: (state) => state.token,
    isAuth: (_, getters) => !!getters.token
  },
  mutations: {
    setToken(state, token : string) {
      localStorage.setItem('jwt-token', token)
      state.token = token
    },
    removeToken(state) {
      localStorage.removeItem('jwt-token')
      state.token = null
    },
    setUser(state, fbPayload :fbPayload) {
      state.user = {
        email: fbPayload.email,
        email_verified: fbPayload.email_verified,
        auth_time: fbPayload.auth_time,
        user_id: fbPayload.user_id,
        exp_time:  fbPayload.exp // истекает
      }
    },
    removeUser (state) {
      state.user = null
    }
  },
  actions: {
    async login({commit, dispatch}, authInfo : AuthInfo) {
      try {
        const apiKey = process.env.VUE_APP_FB_API_KEY
        const authUrl = process.env.VUE_APP_FB_AUTH_URL
        const url = `${authUrl}/accounts:signInWithPassword?key=${apiKey}`
        const {data} = await http.post(url, {...authInfo, returnSecureToken: true})
        const accessToken :string = data.idToken
        const fbPayload: fbPayload = getJWTPayload(accessToken)
        console.log(data, fbPayload)

        commit('setToken', accessToken)
        commit('setUser', fbPayload)

        return { result: true, data }
      } catch (e) {
        return { result: false, data: e.response.data }
      }
    },
    logout({commit}) {
      commit('removeToken')
      commit('removeUser')
    },
    async singUp({commit, dispatch}, singUpInfo: AuthInfo) {
      try {
        const apiKey = process.env.VUE_APP_FB_API_KEY
        const authUrl = process.env.VUE_APP_FB_AUTH_URL
        const url = `${authUrl}/accounts:signUp?key=${apiKey}`
        const {data} = await http.post(url, {...singUpInfo, returnSecureToken: true})
        setTokens(data.accessToken);
        commit('setToken', data.idToken)
        return  { result: true, data }
      } catch (e) {
        return { result: false, data: e.response.data }
      }
    }
  }
}