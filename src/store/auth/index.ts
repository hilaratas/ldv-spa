import {Module} from "vuex";
import {RootState} from "@/store/types";
import {authState, fbPayload} from './types'
import authHttp from "@/authHttp";
import {AuthInfo} from "@/typings";
import {getJWTPayload, setAccessToken} from "@/utils/token"


export const auth: Module<authState, RootState> = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('jwt-token'),
    refreshToken: localStorage.getItem('refresh-token'),
    user: null
  }),
  getters: {
    token: (state) => state.token,
    isAuth: (_, getters) => !!getters.token
  },
  mutations: {
    setAccessToken(state, token : string) {
      localStorage.setItem('jwt-token', token)
      state.token = token
    },
    removeAccessToken(state) {
      localStorage.removeItem('jwt-token')
      state.token = null
    },
    setRefreshToken(_, refreshToken){
      localStorage.setItem('refresh-token', refreshToken)
    },
    removeRefreshToken(_) {
      localStorage.removeItem('refresh-token')
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
        const url = `/accounts:signInWithPassword?key=${apiKey}`
        const {data} = await authHttp.post(url, {...authInfo, returnSecureToken: true})
        const accessToken :string = data.idToken
        const fbPayload: fbPayload = getJWTPayload(accessToken)

        commit('setAccessToken', accessToken)
        commit('setUser', fbPayload)

        return { result: true, data }
      } catch (e) {
        return { result: false, data: e.response.data }
      }
    },
    logout({commit}) {
      commit('removeAccessToken')
      commit('removeRefreshToken')
      commit('removeUser')
    },
    async singUp({commit, dispatch}, singUpInfo: AuthInfo) {
      try {
        const apiKey = process.env.VUE_APP_FB_API_KEY
        const url = `/accounts:signUp?key=${apiKey}`
        const {data} = await authHttp.post(url, {...singUpInfo, returnSecureToken: true})
        commit('setAccessToken', data.idToken)
        return  { result: true, data }
      } catch (e) {
        return { result: false, data: e.response.data }
      }
    }
  }
}