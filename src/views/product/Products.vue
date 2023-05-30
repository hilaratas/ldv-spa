<template>
  <app-loading v-if="isPageLoading"></app-loading>
  <div v-else class="catalog">
    <div v-if="isNoProducts" class="title title--h3">
      На данный момент этот раздел каталога пуст.
    </div>
    <div v-else class="row row--mt30px">
      <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="(pr, key) in products">
        <router-link class="catalog__item" :to='"/catalog/" + pr.catalogSection + "/" + key' :key="key">
          <div class="catalog__img-holder">
            <div class="catalog__img-inner">
              <div class="pict">
                <div class="pict__img-holder pict__img-holder--1_1 is-loading ">
                  <picture class="pict__picture">
                    <!-- todo: добавить  -->
                    <img class="pict__img" :src="pr.img" alt='pr.title'>
                  </picture>
                </div>
              </div>
            </div>
          </div>
          <div class="catalog__text-holder">
            <div class="catalog__text-inner">
              <div class="catalog__title">{{ pr.title }}</div>
              <div class="row align-items-center justify-content-center">
                <div class="col-auto">
                  <div class="catalog__price catalog__price--desk-right">{{pr.price}} <span class="curr">Р</span></div>
                </div>
                <div class="col-auto" v-if="pr.oldPrice">
                  <div class="catalog__old-price catalog__old-price--desk-left">{{pr.oldPrice}} <span class="curr">Р</span></div>
                </div>
              </div>
            </div>
            <div class="catalog__link-holder">
              <span class="button button button--blue button--no-radius button--fw">Подробнее</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {ref,onMounted} from "vue";
import AppLoading from "@/components/AppLoading.vue";

export default {
  name: "Products",
  setup() {
    const route = useRoute()
    const store = useStore()
    const catalogSection = route.params.sectionHru
    const products = ref({})
    const isNoProducts = ref(true)
    const isPageLoading = ref(true)

    onMounted(async() => {
      const {result,  data} = await store.dispatch('product/getProductsByFilter', {catalogSection})
      if (result) {
        products.value = data
        isNoProducts.value = !Object.keys(products.value).length
      }
      isPageLoading.value = false

    })

    return {
      products,
      isNoProducts,
      isPageLoading
    }
  },
  components: { AppLoading }
}
</script>