import http from '@/http'
import {Module} from "vuex";
import {RootState} from '@/store/types'
import {NewsState} from "@/store/news/types";
import {getters} from "@/store/news/getters";
import {Article, ArticleFetchInfo, ArticleTable} from "@/typings";
import {AxiosRequestConfig} from "axios";

export const catalog: Module<any, RootState> = {
  state: {
    catalogSections: []
  },
  getters: {
    catalogSections: s => s.catalogSections()
  },
  mutations: {
    setCatalogSection(state, catalogSection) {

    }
  },
  actions: {
    async fetchCatalogSections() {
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const {data} = await http.get(`/catalogTypes.json`, config)
        let catalogTypes = []
        if (data) {
          catalogTypes = Object.keys(data).map(id => ({...data[id], id}))
        }
        return { result: !!data, data: catalogTypes }
      } catch (e) {
        return { result: false, data: null}
      }
    },
    async isUniqueCatalogSection(_, newSection) {
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const {data} = await http.get(`/catalogTypes/${newSection}.json`, config)
        return !data
      } catch (e) {
        // ошибка запроса - значть мы ичего не знаем про уникальность
        return false
      }
    }
  }
}