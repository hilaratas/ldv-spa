import {Module} from "vuex";
import {RootState} from "@/store/types";
import {authState} from './types'
import http from "@/http";
import {AuthInfo} from "@/typings";


export const auth: Module<authState, RootState> = {
  namespaced: true,
  state: () => ({ token: localStorage.getItem('jwt-token') }),
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
    }
  },
  actions: {
    async login({commit, dispatch}, authInfo : AuthInfo) {
      try {
        const apiKey = process.env.VUE_APP_FB_API_KEY
        const authUrl = process.env.VUE_APP_FB_AUTH_URL
        const url = `${authUrl}/accounts:signInWithPassword?key=${apiKey}`
        const {data} = await http.post(url, {...authInfo, returnSecureToken: true})
        commit('setToken', data.idToken)
        return { result: true, data }
      } catch (e) {
        return { result: false, data: e.response.data }
      }
    },
    logout({commit}) {
      commit('removeToken')
    },
    async singUp({commit, dispatch}, singUpInfo: AuthInfo) {
      try {
        const apiKey = process.env.VUE_APP_FB_API_KEY
        const authUrl = process.env.VUE_APP_FB_AUTH_URL
        const url = `${authUrl}/accounts:signUp?key=${apiKey}`
        const {data} = await http.post(url, {...singUpInfo, returnSecureToken: true})
        commit('setToken', data.idToken)
        return  { result: true, data }
      } catch (e) {
        return { result: false, data: e.response.data }
      }
    }
  }
}