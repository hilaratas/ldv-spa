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
    async createNews({commit, dispatch}, payload) {
      try {
        const response = await http.post('/news.json', payload)
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
        const {data} = await http.put(`/news/${payload.id}.json`, payload)
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
    async fetchNews({dispatch}) {
      try {
        const {data} = await http.get('/news.json')
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
    async fetchOneNewsById({dispatch}, id) {
      try {
        const {data} = await http.get(`/news/${id}.json`)
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