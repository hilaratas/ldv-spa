import {createStore, Store} from 'vuex'
import { RootState } from './types';
import {news} from './modules/news'
import {alerts} from './modules/alerts'

export default createStore ({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { news, alerts }
})
