export default {
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
   alerts(state) {
     return state.alerts
   }
  },
  mutations: {
    alertAdd(state, newAlert) {
      state.alerts.push(newAlert)
    },
    alertRemove(state, {id}) {
      state.alerts = state.alerts.filter(alert => +alert.id !== +id)
    }
  },
  actions: {
    alertAdd({commit}, newAlert) {
      commit('alertAdd',newAlert)
    },
    alertRemove({commit}, alert) {
      commit('alertRemove', alert)
    }

  }
}