import http from '@/http'
import {Module} from "vuex";
import {RootState} from '@/store/types'
import {AxiosRequestConfig} from "axios";
import {Product, ProductCrop} from "@/typings";
import {ProductState, EditProduct, ProductsFilter, changeSectionHru} from "./types";
import {cleanAccessToken} from "@/utils/token";
import {createCommentVNode} from "vue";

export const product: Module<ProductState, RootState> = {
  namespaced: true,
  actions: {
    async getProductsAll({commit}) {
      const config :AxiosRequestConfig = {params: { auth: null }}
      try {
        const {data} = await http.get(`/products.json`, config)
        return { result: !!data, data }
      } catch (e) {
        return { result: false, data: e }
      }
    },
    async getProductsByFilter({dispatch}, filter :ProductsFilter) {
      const config :AxiosRequestConfig = {params: { auth: null }}
      const {catalogSection} = filter
      if (catalogSection) {
        config.params.orderBy = `"catalogSection"`
        config.params.equalTo = `"${catalogSection}"`
      }
      try {
        const {data} = await http.get(`/products.json`, config)
        return { result: !!data, data }
      } catch (e) {
        return { result: false, data: e }
      }
    },
    async changeSectionHru( {dispatch}, payload :changeSectionHru ) {
      const config :AxiosRequestConfig = {params: { auth: null }}
      const { oldSectionHru, newSectionHru } = payload
      try {
        let { data } = await dispatch('getProductsByFilter', {catalogSection: oldSectionHru})
        const patchParams :any = {}
        Object.keys(data).map(key => patchParams[`${key}/catalogSection`] = newSectionHru)
        data = await http.patch(`/products.json`, patchParams, config)
        return { result: !!data, data }
      } catch (e) {
        return { result: false, data: null }
      }
    },
    async isUniqueProduct( _, hru: string) {
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const {data} = await http.get(`/products/${hru}.json`, config)
        return !data
      } catch (e) {
        return false
      }
    },
    async createProduct(_, product :Product ) {
      const hru: string = product.hru
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        let payload = {}
        payload = {...product}
        const {data} = await http.put(`/products/${hru}.json`, payload, config)
        return {result: !!data, data}
      } catch (e) {
        return { result: false, data: e}
      }
    },
    async editProduct({dispatch}, product :EditProduct ) {
      const {newProdHru, oldProdHru} = product
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        let  payload = {} as ProductCrop
        payload = {...product}
        //@ts-ignore
        delete payload.oldProdHru
        //@ts-ignore
        delete payload.newProdHru
        await http.delete(`/products/${oldProdHru}.json`, config)
        const {data} = await http.patch(`/products/${newProdHru}.json`, payload, config)
        return { result: !!data, data }
      } catch (e) {
        // ошибка запроса - значит мы ничего не знаем про уникальность
        return { result: false, data: e }
      }
    },
    async getProduct ({dispatch}, prHru) {
      const config :AxiosRequestConfig = {params: { auth: null }}
      try {
        const {data} = await http.get(`/products/${prHru}.json`, config)
        return { result: !!data, data}
      } catch (e) {
        return {result: false, e }
      }
    }
  }
}