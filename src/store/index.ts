import {createStore, Store, createLogger} from 'vuex'
import { RootState } from './types';
import {news} from './news/'
import {alerts} from './alerts'
import {auth} from './auth'

const mode = process.env.NODE_ENV
const plugins = []
if (mode === 'development') {
  plugins.push(createLogger())
}

export default createStore  ({
  modules: { news, alerts, auth },
  strict: mode === 'development',
  //plugins
})
