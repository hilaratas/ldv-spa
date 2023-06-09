import {Module} from "vuex";
import {RootState} from "@/store/types";
import {authState, User} from './types'
import authHttp from "@/authHttp";
import {AuthInfo, fbUserPayload} from "@/typings";
import {getJWTPayload, setAccessToken} from "@/utils/token"
import {user} from '@/utils/user'


export const auth: Module<authState, RootState> = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('jwt-token'),
    refreshToken: localStorage.getItem('refresh-token')
  }),
  getters: {
    token: (state)   => state.token,
    refreshToken: (state) => state.refreshToken,
    user: function (state) :null | User {
      const accessToken = state.token
      return !accessToken ? null : user(getJWTPayload(accessToken))
    },
    userId: function (state) :null | string {
      const accessToken = state.token
      return !accessToken ? null : user(getJWTPayload(accessToken)).user_id
    },
    isAuth: (_, getters) => !!getters.token,
    isAdmin: (_,  getters) :boolean => getters.user?.email === 'nadezda.rachkova@mail.ru'
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
    setRefreshToken(state, refreshToken){
      localStorage.setItem('refresh-token', refreshToken)
      state.refreshToken = refreshToken
    },
    removeRefreshToken(state) {
      localStorage.removeItem('refresh-token')
      state.refreshToken = null
    }
  },
  actions: {
    async login({commit, dispatch}, authInfo : AuthInfo) {
      try {
        const apiKey = process.env.VUE_APP_FB_API_KEY
        const url = `/accounts:signInWithPassword?key=${apiKey}`
        const {data} = await authHttp.post(url, {...authInfo, returnSecureToken: true})
        const accessToken :string = data.idToken
        const refreshToken :string = data.refreshToken
        const fbPayload: fbUserPayload = getJWTPayload(accessToken)

        commit('setAccessToken', accessToken)
        commit('setRefreshToken', refreshToken)

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
    },
    async verifyEmail({commit, getters}) {
      try {
        const apiKey = process.env.VUE_APP_FB_API_KEY
        const url = `/accounts:sendOobCode?key=${apiKey}`
        const token = getters['token']
        const {data} = await authHttp.post(url, {idToken: token, requestType: "VERIFY_EMAIL"})
        return {result: true, data}
      } catch (e) {
        return {result: false, error: e}
      }
    }
  }
}