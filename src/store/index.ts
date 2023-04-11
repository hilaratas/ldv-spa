import { createStore } from 'vuex'
import {news} from './modules/news'
import alerts from './modules/alerts.js'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { news, alerts }
})
