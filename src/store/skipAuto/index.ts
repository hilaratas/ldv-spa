import http from '@/http'
import {Module} from "vuex";
import {RootState} from '@/store/types'
import {paramInfo, skipAutoState} from "./types";
import {ArticleFetchInfo, ArticleTable} from "@/typings";

export const news: Module<skipAutoState, RootState> = {
  mutations: {
    setValue(state, paramInfo: paramInfo) {
      let skipAutoString = localStorage.getItem('skipAuto')
      let skipAuto = skipAutoString ? JSON.parse(skipAutoString) : {}

      skipAuto = {...skipAuto, paramInfo}
      localStorage.setItem('skipAuto', JSON.stringify(skipAuto))
    },
    getValue(state, paramName) {
    }
  },
  actions: {
    setValue({commit}, paramInfo: paramInfo) {
      commit('setValue', paramInfo)
    },
    getValue() {

    }
  }
}