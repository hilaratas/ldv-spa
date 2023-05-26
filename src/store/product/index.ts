import http from '@/http'
import {Module} from "vuex";
import {RootState} from '@/store/types'
import {AxiosRequestConfig} from "axios";
import {Product} from "@/typings";
import {ProductState, EditProduct} from "./types";

export const product: Module<ProductState, RootState> = {
  namespaced: true,
  actions: {
    async getAllProducts({commit}) {
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        const {data} = await http.get(`/products.json`, config)
        return { result: !!data, data }
      } catch (e) {
        return { result: false, data: e }
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
      const {newHru, oldHru} = product
      try {
        const config :AxiosRequestConfig = {params: { auth: null }}
        let  payload = {}
        payload = {...product}
        await http.delete(`/products/${oldHru}.json`, config)
        const {data} = await http.patch(`/products/${newHru}.json`, payload, config)
        return { result: !!data, data }
      } catch (e) {
        // ошибка запроса - значит мы ничего не знаем про уникальность
        return { result: false, data: e }
      }
    }
  }
}