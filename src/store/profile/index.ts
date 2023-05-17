import {Module} from "vuex";
import {ProfileState, Profile} from "./types";
import {RootState} from "@/store/types";
import {AxiosRequestConfig} from "axios";
import http from "@/http";
import store from "@/store";

export const profile: Module<ProfileState, RootState> = {
  namespaced: true,
  state: {
    profile: {}
  },
  getters: {
    profile: (state)  => state.profile
  },
  mutations: {
    setProfile(state, profile: Profile) {
      state.profile = profile
    }
  },
  actions: {
    async fetchProfile({rootGetters, commit}) {
      const {user_id} = rootGetters['auth/user']
      const config :AxiosRequestConfig = {params: { auth: null }}
      try {
        const {data} = await http.get(`/profile/${user_id}.json`, config)
        if (!data) {
          return;
        }
        commit('setProfile', data)
      } catch (e) {
      }
    },
    async editProfile( {rootGetters}, profile :Profile) {
      const config :AxiosRequestConfig = {params: { auth: null }}
      const {user_id} = rootGetters['auth/user']
      try {
        const {data} = await http.put(`/profile/${user_id}.json`, profile, config)
        return { result: true, data }
      } catch (e) {
        return { result: false, data: null }
      }
    }
  }
}