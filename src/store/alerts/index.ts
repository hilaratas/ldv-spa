import { Module } from "vuex";
import {Alert, AlertId} from "@/typings";
import {RootState} from "@/store/types";
import {AlertsState} from "@/store/alerts/types";

export const alerts: Module<AlertsState, RootState> = {
  namespaced: true,
  state: {
    alerts: []
  },
  getters: {
   alerts(state: AlertsState) : Array<Alert>{
     return state.alerts
   }
  },
  mutations: {
    alertAdd(state : AlertsState, newAlert : Alert) : void {
      state.alerts.push(newAlert)
    },
    alertRemove(state: AlertsState, {id} : {id : AlertId}) : void {
      state.alerts = state.alerts.filter((alert: Alert) => +alert.id !== +id)
    }
  },
  actions: {
    alertAdd({commit}, newAlert : Alert) : void {
      commit('alertAdd',newAlert)
      if (newAlert.closable) {
        setTimeout(()=>(
          commit('alertRemove', newAlert)
        ), 5000)
      }
    },
    alertRemove({commit}, alert : Alert) : void {
      commit('alertRemove', alert)
    }

  }
}