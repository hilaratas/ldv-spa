<template>
  <component :is="componentName"></component>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import Product from './product/Product.vue'
import ProductsBySection from './product/ProductsBySection.vue'

export default defineComponent({
  name: "ProductOrSection",
  setup() {
    const store = useStore()
    const route = useRoute()
    const routeHru = route.params.hru
    const section = store.getters['catalog/catalogSection'](`${routeHru}`)
    const componentName = !section ? 'Product' : 'ProductsBySection'

    return {
      componentName
    }
  },
  components: {Product, ProductsBySection}
})
</script>