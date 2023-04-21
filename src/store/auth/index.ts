import {Module} from "vuex";
import {RootState} from "@/store/types";
import {authState} from './types'
import http from "@/http";
import {AuthInfo} from "@/typings";
import {error} from "@/utils/error";


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
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        const {data} = await http.post(url, {...authInfo, returnSecureToken: true})
        commit('setToken', data.idToken)
        return true
      } catch (e) {
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: error(e.response.data.error.message),
          type: 'error',
          closable: true,
          autoClosable: false
        }, {root: true})
        return false
      }
    },
    logout({commit}) {
      commit('removeToken')
    },
    async singUp({commit, dispatch}, singUpInfo: AuthInfo) {
      try {
        const apiKey = process.env.VUE_APP_FB_API_KEY
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        const {data} = await http.post(url, {...singUpInfo, returnSecureToken: true})
        commit('setToken', data.idToken)
        return true
      } catch (e) {
        const errorCode: string = e.response.data.error.message
        const specifyErrorCode: string = errorCode !== 'OPERATION_NOT_ALLOWED' ?
          errorCode :`SING_UP_${errorCode}`
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: error(specifyErrorCode),
          type: 'error',
          closable: true,
          autoClosable: false
        }, {root: true})
        return false
      }
    }
  }
}