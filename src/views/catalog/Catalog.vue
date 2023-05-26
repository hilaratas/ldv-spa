<template>
  <div class="services">
    <div v-if="!catalogSections" class="title title--h3">
      На данный момент каталог пуст
    </div>
    <div v-else class="services__zz row row--30px row--small-phone-15px row--mt60px">
      <div v-for="(cat,key) in catalogSections" class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" :key="cat.hru">
        <router-link :to="'catalog/' + key" class="services__item" >
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
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";

export default {
  name: "Catalog",
  setup() {
    const store = useStore()
    const catalogSections = store.getters['catalog/catalogSections']
    return {
      catalogSections
    }
  }
}
</script>