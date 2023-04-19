import http from '@/http'
import {Module} from "vuex";
import {RootState} from '@/store/types'
import {NewsState} from "@/store/news/types";
import {getters} from "@/store/news/getters";
import {Article, ArticleTable} from "@/typings";

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
        if (data) {
          return Object.keys(data).map(id => ({...data[id], id}))
        }
        return false
      } catch (e) {
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка ответа от сервера при получении новостей',
          type: 'error',
          closable: true,
          autoClosable: false
        }, {root: true})
      }
    },
    async createNews({commit, dispatch}, payload: ArticleTable) {
      const tableName = payload.tableName
      const article = {...payload}
      delete article.tableName
      try {
        await http.post(`/${tableName}.json`, article)
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Новость успешно добавлена',
          type: 'success',
          closable: true,
          autoClosable: false
        }, {root: true})
        return true
      } catch (e) {
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка ответа от сервера при добавлении новой новости',
          type: 'error',
          closable: true,
          autoClosable: false
        }, {root: true})
        return false
        //throw new Error()
      }
    },
    async editOneNewsById({dispatch}, payload) {
      try {
        const tableName = payload.tableName
        const article = {...payload}
        delete article.tableName
        await http.put(`/${tableName}/${article.id}.json`, article)
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Новость успешно отредактирована',
          type: 'success',
          closable: true,
          autoClosable: false
        }, {root: true})
        return true
      } catch (e) {
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка ответа от сервера при редактировании новости',
          type: 'error',
          closable: true,
          autoClosable: false
        }, {root: true})
        return false
      }
    },
    async fetchOneNewsById({dispatch}, payload) {
      const tableName = payload.tableName
      const id = payload.id
      try {
        const {data} = await http.get(`/${tableName}/${id}.json`)
        return data
      } catch (e) {
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: `Ошибка ответа от сервера при получении новости с id=${id}`,
          type: 'error',
          closable: true,
          autoClosable: false
        }, {root: true})
      }
    }
  },
}