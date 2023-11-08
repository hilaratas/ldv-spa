<template>
  <app-loading v-if="isPageLoading"></app-loading>
  <div v-else class="product">
    <div class="row">
      <div class="col-12">
        <h1 class="title title--h2 title--onl title--blue">{{ product.title }}</h1>
      </div>
      <div class="col-12 col-sm-5 col-xl-4">
        <div class="product__left">
          <div class="product__img-holder">
            <div class="product__img-inner">
              <picture class="product__pict">
                <img class="product__img" :src="product.img" :alt="product.title">
              </picture>
            </div>
          </div>
          <div class="product__label-holder">
            <div v-if="isSale" class="product__label is-sale">Sale</div>
            <div v-if="product.forOrder" class="product__label is-for-order">Под заказ</div>
          </div>
        </div>

      </div>
      <div class="col-12 col-sm-7 col-xl-8">
        <div class="product__details product__details--not-small-phone-mt0">
          <div class="title--h3 title--blue title--not-small-phone-hidden">Информация о товаре</div>
          <div class="product__price-holder">
            <div class="product__details-title">Цена:</div>
            <div class="row align-items-end">
              <div class="col-auto">
                <div class="product__price">{{product.price}} P</div>
              </div>
              <div v-if="product.oldPrice" class="col-auto">
                <div class="product__old-price">{{product.oldPrice}} P</div>
              </div>
            </div>
          </div>
        </div>

        <form action="#" method="post">
          <input type="hidden" name="id" :value="product.hru">
          <input type="hidden" name="price" :value="product.price">
          <div class="product__details">
            <div class="row">
              <div class="col-auto">
                <div class="product__colors-holder">
                  <div class="product__details-title">Цвет швов:</div>
                  <div class="product__colors">
                    <div class="row row--6px">
                      <div class="col-auto" v-for="(title, key) in prColorTitles">
                        <label class="product-color"><input type="radio" name="color" :value="key" checked><span class="radio_attr_label">{{title}}</span></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="product__count-holder">
                  <label class="product__details-title">Количество:</label>
                  <div class="product__count">
                    <div class="row row--6px">
                      <div class="col-auto">
                        <input type="number" class="input" name="count" value="1" min="1" max="10">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product__details">
            <div class="row">
              <div class="col-10">
                <div class="product__details-title">Примечание к заказу:</div>
                <textarea class="textarea" name="comment"></textarea>
                <div class="product__note">
                  Тут можно добавить пожелания к заказу, вопрос или другую необходимую информацию
                </div>
              </div>
            </div>
          </div>
          <div class="product__submit-holder">
            <div class="row">
              <div class="col-10">
                <button type="submit" class="button button--blue button">Добавить в корзину</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="product__details">
      <div class="title--h3 title--blue">Описание изделия</div>
      <div class="product-details">
        <div v-html="product.desc"></div>
      </div>
    </div>

    <app-gallery/>

  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex"
import { useRoute } from 'vue-router'
import { PRODUCT_COLOR_TITLES} from '@/config/product-colors'
import AppLoading from '@/components/AppLoading'
import AppGallery from '@/components/AppGallery'


export default {
  name: "Product",
  setup() {
    const store = useStore()
    const route = useRoute()
    const isPageLoading = ref(true)
    const prHRU = route.params['hru']
    const isSale = ref(false)
    let product = ref({})
    const prColorTitles = {...PRODUCT_COLOR_TITLES['ru']}

    onMounted(async () =>{
      const res = await store.dispatch('product/getProduct', prHRU)
      if (res.result) {
        product.value = {...res.data, hru: prHRU}
        isPageLoading.value = false
        isSale.value = product.value.oldPrice ? ( product.value.price - product.value.oldPrice < 0) : false
      }
    })

    return {
      product,
      isSale,
      isPageLoading,
      prColorTitles
    }
  },
  components: { AppLoading, AppGallery }
}
</script>