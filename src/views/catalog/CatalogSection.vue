<template>
  <div v-if="!catalogSections" class="title title--h3">
    На данный момент каталог пуст
    <br>
  </div>
  <div v-if="isAdmin" style="padding-bottom: 15px">
    <div class="row row--6px">
      <div class="col-auto"><router-link class="button" to="/catalog/add">Добавить новый раздел</router-link></div>
      <div class="col-auto"><router-link class="button" to="/catalog/product/add">Добавить новый продукт</router-link></div>
    </div>
  </div>
  <services-list :services="catalogSections"></services-list>
</template>

<script>
import { useStore } from "vuex";
import ServicesList from "@/components/Services/ServiceList.vue";

export default {
  name: "CatalogSection",
  setup() {
    const store = useStore()
    const catalogSections = store.getters['catalog/catalogSections']
    const isAdmin = store.getters['auth/isAdmin']

    return {
      isAdmin,
      catalogSections
    }
  },
  components: { ServicesList }
}
</script>