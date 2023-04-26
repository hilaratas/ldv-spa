import {Module} from "vuex";
import {RootState} from '@/store/types'
import {paramInfo, skipAutoState} from "./types";
import {skipAutoItem, skipAutoTypes} from "@/typings";

export const skipAuto: Module<skipAutoState, RootState> = {
  namespaced: true,
  state: {
    singIn: localStorage.getItem('singIn'),
    singUp: localStorage.getItem('singUp')
  },
  getters: {
    // todo: разобраться с типами
    // @ts-ignore
    singIn: (state) : skipAutoItem => state.singIn ? new Date(state.singIn) : null,
    // @ts-ignore
    singUp: (state) : skipAutoItem => state.singUp ? new Date(state.singUp) : null
  },
  mutations: {
    setParam(state : skipAutoState, paramInfo: paramInfo) {
      const key : string =  Object.keys(paramInfo)[0]
      const value = Object.values(paramInfo)[0]
      state[key as keyof skipAutoState] = value
      // todo: разобраться с типами
      // @ts-ignore
      localStorage.setItem(key, value)
    }
  },
  actions: {
    setParam({commit}, paramInfo: paramInfo) {
      commit('setParam', paramInfo)
    }
  }
}