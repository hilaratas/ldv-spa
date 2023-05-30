<template>
  <div v-if="!catalogSections" class="title title--h3">
    На данный момент каталог пуст
    <br>
  </div>
  <div v-if="isAuth" style="padding-bottom: 15px">
    <div class="row row--6px">
      <div class="col-auto"><router-link class="button" to="/catalog/add">Добавить новый раздел</router-link></div>
      <div class="col-auto"><router-link class="button" to="/catalog/product/add">Добавить новый продукт</router-link></div>
    </div>
  </div>
  <div v-if="catalogSections" class="services">
    <div class="services__zz row row--30px row--small-phone-15px row--mt60px">
      <div v-for="(cat,key) in catalogSections" class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" :key="cat.hru">
        <router-link :to="'/catalog/' + key" class="services__item" >
          <div class="services__img-holder aos-init aos-animate" data-aos="fade-left">
            <div class="services__img-inner">
              <picture class="services__pict">
                <img class="services__img" :src="cat.img" alt="">
              </picture>
            </div>
          </div>
          <div class="services__text-holder">
            <div class="services__text">{{ cat.title }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "Catalog",
  setup() {
    const store = useStore()
    const catalogSections = store.getters['catalog/catalogSections']
    const isAuth = store.getters['auth/isAuth']
    console.log(isAuth)

    return {
      isAuth,
      catalogSections
    }
  }
}
</script>