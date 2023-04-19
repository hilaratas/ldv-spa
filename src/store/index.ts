import {createStore, Store} from 'vuex'
import { RootState } from './types';
import {news} from './news/'
import {alerts} from './alerts'

export default createStore ({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { news, alerts },
  strict: process.env.NODE_ENV !== 'production'
})
