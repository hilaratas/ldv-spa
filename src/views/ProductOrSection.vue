<template>
  {{componentName}}
  <app-loading v-if="pageLoading"></app-loading>
  <component v-else :is="componentName" ></component>
</template>

<script lang="js">
import {defineComponent} from 'vue'
import {mapGetters} from "vuex"
import Product from './product/Product.vue'
import ProductsBySection from './product/ProductsBySection.vue'
import AppLoading from "@/components/AppLoading.vue";

export default {
  name: "ProductOrSection",
  data: () => ({
    componentName: 'ProductsBySection',
    pageLoading: true
  }),
  beforeRouteEnter(to, from, next) {
    console.log("Я сюда не попадаю")
    next( vm => {
      const routeHru = vm.$route.params.hru
      const section = vm.$store.getters["catalog/catalogSection"](routeHru)
      vm.componentName = !section ? 'Product' : 'ProductsBySection'
      vm.pageLoading = false
    })
  },
  components: {AppLoading, Product, ProductsBySection}
}
</script>