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
        const response = await http.post('/news.json1', payload)
        console.log(response)
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Новость успешно добавлена',
          type: 'success',
          closable: true,
          autoClosable: false
        }, {root: true})
      } catch (e) {
        dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка ответа от сервера при добавлении новой новости',
          type: 'error',
          closable: true,
          autoClosable: false
        }, {root: true})
        throw new Error()
      }
    }
  },
}