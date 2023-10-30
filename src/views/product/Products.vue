<template>
  <app-loading v-if="isPageLoading"></app-loading>
  <template v-else>
    <app-404 v-if="!isCatSecExist">
      <div class="title title--h1">404</div>
      <div>Такаго раздела каталога не существует</div>
      <div v-if="isAdmin">
        <br>
        <router-link to="/catalog/add" class="button">Добавить раздел каталога</router-link>
      </div>
    </app-404>
    <div v-else-if="isNoProducts" class="title title--h3">
      На данный момент этот раздел каталога пуст.
    </div>
    <template v-else>
      <div v-if="isAdmin" style="padding-bottom: 15px">
        <div class="row row--6px">
          <div class="col-auto">
            <router-link :to="'/catalog/edit/' + sectionHru" class="button">Редактировать раздел каталога</router-link>
          </div>
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
  name: "Products",
  setup() {
    const route = useRoute()
    const store = useStore()
    const sectionHru = route.params.sectionHru
    const products = ref({})
    const catalogSection = store.getters['catalog/catalogSection'](sectionHru)
    const isCatSecExist = !!catalogSection
    const isNoProducts = ref(true)
    const isPageLoading = ref(true)
    const isAdmin = store.getters['auth/isAdmin']

    onMounted(async() => {
      if (isCatSecExist) {
        const {result, data} = await store.dispatch('product/getProductsByFilter', {catalogSection: sectionHru})
        if (result) {
          products.value = data
          isNoProducts.value = !Object.keys(products.value).length
        }
      }
      isPageLoading.value = false
    })

    return {
      isAdmin,
      products,
      sectionHru,
      isNoProducts,
      isPageLoading,
      isCatSecExist
    }
  },
  components: { AppLoading, App404, ProductsList }
}
</script>