<template>
  <app-loading v-if="isPageLoading"></app-loading>
  <template v-else>
    <app-404 v-if="!isCatSecExist">
      <div class="title title--h1">404</div>
      <div>Такаго раздела каталога не существует</div>
      <div v-if="isAuth">
        <br>
        <router-link to="/catalog/add" class="button">Добавить раздел каталога</router-link>
      </div>
    </app-404>
    <div v-else-if="isNoProducts" class="title title--h3">
      На данный момент этот раздел каталога пуст.
    </div>
    <div v-else class="catalog">
    <div class="row row--mt30px">
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
</template>

<script>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {ref,onMounted} from "vue";
import AppLoading from "@/components/AppLoading.vue";
import App404 from "@/components/App404.vue";

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
    const isAuth = store.getters['auth/isAuth']

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
      isAuth,
      products,
      isNoProducts,
      isPageLoading,
      isCatSecExist
    }
  },
  components: { AppLoading, App404 }
}
</script>