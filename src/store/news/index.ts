import http from '@/http'
import {Module} from "vuex";
import {RootState} from '@/store/types'
import {NewsState} from "@/store/news/types";
import {getters} from "@/store/news/getters";
import {Article, ArticleFetchInfo, ArticleTable} from "@/typings";

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
    async fetchNews({dispatch}, tableName: string) {
      try {
        const {data} = await http.get(`/${tableName}.json`)
        let articles :Array<Article> = []
        if (data) {
          articles = Object.keys(data).map(id => ({...data[id], id}))
        }
        return { result: true, data: articles }
      } catch (e) {
        return { result: false, data: null }
      }
    },
    async createNews({commit, dispatch}, payload: ArticleTable) {
      const tableName = payload.tableName
      const article = {...payload}
      delete article.tableName
      try {
        const {data} = await http.post(`/${tableName}.json`, article)
        return { result: true, data }
      } catch (e) {
        return { result: false, data: null }
      }
    },
    async editOneNewsById({dispatch}, payload : ArticleTable) {
      try {
        const tableName = payload.tableName
        const id = payload.id
        let article = {...payload}
        delete article.tableName
        const {data} = await http.put(`/${tableName}/${id}.json`, article)
        return { result: true, data }
      } catch (e) {
        return { result: true, data: null }
      }
    },
    async fetchOneNewsById({dispatch}, payload :ArticleFetchInfo) {
      const tableName = payload.tableName
      const id = payload.id
      try {
        const {data} = await http.get(`/${tableName}/${id}.json`)
        return { result: !!data, data }
      } catch (e) {
        //todo: инсценировать ошибочную ситуацию и протестировать ее
        return { result: false, data: null }
      }
    },
    async deleteOneNewsById({dispatch}, {id, tableName}: ArticleFetchInfo) {
      try {
        const res = await http.delete(`/${tableName}/${id}.json`)
        console.log(res)
        return { result: true }
      } catch (e) {
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: `Запись с id=${id} удалить не удалось`,
          type: 'success',
          closable: true,
          autoClosable: false
        }, {root: true})
        return { result: false }
      }
    }
  }
}