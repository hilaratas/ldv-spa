import http from '@/http'
import {Module} from "vuex";
import {RootState} from '@/store/types'
import {CatalogSection} from "@/typings";
import {AxiosRequestConfig} from "axios";
import {CatalogSectionPayLoad, CatalogState, EditCatalogSection} from "./types";

//todo: избавиться от any
export const catalog: Module<any, RootState> = {
  namespaced: true,
  state: {
    catalogSections: {}
  },
  getters: {
    catalogSections: s => s.catalogSections,
    catalogSection: s => (hru :string) => s.catalogSections[hru]
  },
  mutations: {
    editCatalogSection(state, catalogSection) {
    },
    setCatalogSections(state, sections: Array<CatalogSection>) {
      state.catalogSections = sections
    }
  },
  actions: {
    async fetchCatalogSections({commit}) {
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const {data} = await http.get(`/catalogSections.json`, config)
        if (data) {
          commit('setCatalogSections', data)
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    isUniqueCatalogSection( {state}, hru: string) {
      return !state.catalogSections[hru]
    },
    async createCatalogSection(_, newSection :CatalogSection) {
      const hru: string = newSection.hru
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const payLoad :CatalogSectionPayLoad = {img : newSection.img, title: newSection.title}
        const {data} = await http.put(`/catalogSections/${hru}.json`, payLoad, config)
        return {result: !!data, data}
      } catch (e) {
        return { result: false, data: e}
      }
    },
    async editCatalogSection({dispatch}, section :EditCatalogSection ) {
      const {newHru, oldHru} = section
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const payLoad :CatalogSectionPayLoad = {img : section.img, title: section.title}
        await http.delete(`/catalogSections/${oldHru}.json`, config)
        const {data} = await http.patch(`/catalogSections/${newHru}.json`, payLoad, config)
        return { result: !!data, data }
      } catch (e) {
        // ошибка запроса - значит мы ничего не знаем про уникальность
        return { result: false, data: e }
      }
    }
  }
}