import http from '@/http'

export default {
  namespaced: true,
  state: {
    news: []
  },
  getters: {
  },
  mutations: {
    setNews(state, news) {
      state.news = news
    }
  },
  actions: {
    async fetchNews({dispatch}, tableName) {
      try {
        const {data} = await http.get(`/${tableName}.json`)
        if (data) {
          const news = Object.keys(data).map(id => ({...data[id], id}))
          return news
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
    // payload {
    // tableName,
    // }
    async createNews({commit, dispatch}, payload) {
      try {
        const tableName = payload.tableName
        const article = {...payload}
        delete article.tableName
        const response = await http.post(`/${tableName}.json`, article)
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
        const {data} = await http.put(`/${tableName}/${article.id}.json`, article)
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
      try {
        const tableName = payload.tableName
        const id = payload.id
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