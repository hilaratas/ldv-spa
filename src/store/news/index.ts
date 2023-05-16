import http from '@/http'
import {Module} from "vuex";
import {RootState} from '@/store/types'
import {NewsState} from "@/store/news/types";
import {getters} from "@/store/news/getters";
import {Article, ArticleFetchInfo, ArticleTable} from "@/typings";
import {auth} from "@/store/auth";
import {AxiosRequestConfig} from "axios";

export const news: Module<NewsState, RootState> = {
  namespaced: true,
  state: {
    news: [],
    a_and_s: []
  },
  getters,
  mutations: {
    setNews(state, news) {
      state.news = news
    }
  },
  actions: {
    async fetchNews({rootGetters}, tableName: string) {
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const {data} = await http.get(`/${tableName}.json`, config)
        let articles :Array<Article> = []
        if (data) {
          articles = Object.keys(data).map(id => ({...data[id], id}))
        }
        return { result: true, data: articles }
      } catch (e) {
        return { result: false, data: null }
      }
    },
    async createNews({rootGetters}, payload: ArticleTable) {
      //todo: Избавиться от undefined для tableName
      const tableName = payload.tableName
      const article = {...payload}
      delete article.tableName
      const config :AxiosRequestConfig = {params: { auth: null }}
      try {
        const {data} = await http.post(`/${tableName}.json`, article, config)
        return { result: true, data }
      } catch (e) {
        return { result: false, data: null }
      }
    },
    async editOneNewsById({rootGetters}, payload : ArticleTable) {
      try {
        const tableName = payload.tableName
        const id = payload.id
        let article = {...payload}
        delete article.tableName
        const config :AxiosRequestConfig = {params: { auth: null }}
        const {data} = await http.put(`/${tableName}/${id}.json`, article, config)
        return { result: true, data }
      } catch (e) {
        return { result: true, data: null }
      }
    },
    async fetchOneNewsById({rootGetters}, payload :ArticleFetchInfo) {
      const tableName = payload.tableName
      const id = payload.id
      const config :AxiosRequestConfig = {params: { auth: null }}
      try {
        const {data} = await http.get(`/${tableName}/${id}.json`, config)
        return { result: !!data, data }
      } catch (e) {
        //todo: инсценировать ошибочную ситуацию и протестировать ее
        return { result: false, data: null }
      }
    },
    async deleteOneNewsById({dispatch, rootGetters}, {id, tableName}: ArticleFetchInfo) {
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const res = await http.delete(`/${tableName}/${id}.json`, config)
        return { result: true }
      } catch (e) {
        return { result: false }
      }
    }
  }
}