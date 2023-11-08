<template>
  <app-loading v-if="isPageLoading"></app-loading>
  <template v-else>
    <div v-if="isNoProducts" class="title title--h3">
      На данный момент этот раздел каталога пуст.
    </div>
    <template v-else>
      <div v-if="isAdmin" style="padding-bottom: 15px">
        <div class="row row--6px">
          <div class="col-auto">
            <router-link to="/catalog/product/add" class="button">Добавить изделие</router-link>
          </div>
        </div>
      </div>

      <products-list :products="products"></products-list>
    </template>
  </template>
</template>

<script>
import {useRoute} from "vue-router"
import {useStore} from "vuex"
import {ref,onMounted} from "vue"
import AppLoading from "@/components/AppLoading.vue"
import App404 from "@/components/App404.vue"
import ProductsList from "@/components/ProductsList.vue"

export default {
  name: "ProductsAll",
  setup() {
    const route = useRoute()
    const store = useStore()
    const sectionHru = route.params.sectionHru
    const products = ref({})
    const isNoProducts = ref(true)
    const isPageLoading = ref(true)
    const isAdmin = store.getters['auth/isAdmin']

    onMounted(async() => {
      const {result, data} = await store.dispatch('product/getProductsAll')
      if (result) {
        products.value = data
        isNoProducts.value = !Object.keys(products.value).length
      }
      isPageLoading.value = false
    })

    return {
      isAdmin,
      products,
      sectionHru,
      isNoProducts,
      isPageLoading
    }
  },
  components: { AppLoading, App404, ProductsList }
}
</script>