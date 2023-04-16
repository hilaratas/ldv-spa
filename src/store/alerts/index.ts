import { Module } from "vuex";

export const alerts: Module<any, any> = {
  namespaced: true,
  state: {
    alerts: []
  },
  getters: {
    // alert:
    // id - Date.now()
    // text - String
    // type: Array['none', 'primary', 'success', 'error']
    // closable: Boolean
    // autoClosable: Boolean
   alerts(state: any) {
     return state.alerts
   }
  },
  mutations: {
    alertAdd(state: any, newAlert: any) {
      state.alerts.push(newAlert)
    },
    alertRemove(state: any, {id}) {
      state.alerts = state.alerts.filter((alert: any) => +alert.id !== +id)
    }
  },
  actions: {
    alertAdd({commit}, newAlert: any) {
      commit('alertAdd',newAlert)
    },
    alertRemove({commit}, alert: any) {
      commit('alertRemove', alert)
    }

  }
}