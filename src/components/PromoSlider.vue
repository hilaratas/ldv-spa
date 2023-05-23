<template>
  <div class="promo-slider" id="js-main-slider">
    <div class="promo-slider__item" style="background-image: url('/example/suculenty.jpg');">
      <div class="promo-slider__promo-holder">
        <div class="promo-slider__promo">
          <div class="promo-slider__text">Флорариумы</div>
          <div class="promo-slider__button-holder">
            <a href="#" class="button">Подробнее</a>
          </div>
        </div>
      </div>
    </div>
    <div class="promo-slider__item" style="background-image: url('/example/izdelia-tiffany.jpg'); ">
      <div class="promo-slider__promo-holder">
        <div class="promo-slider__promo">
          <div class="promo-slider__text">Изделия в стиле Тиффани</div>
          <div class="promo-slider__button-holder">
            <a href="#" class="button">Подробнее</a>
          </div>
        </div>
      </div>
    </div>
    <div class="promo-slider__item" style="background-image: url('/example/wedding.jpg'); ">
      <div class="promo-slider__promo-holder">
        <div class="promo-slider__promo">
          <div class="promo-slider__text">Изделия в стиле Тиффани
            <br> для свадебных церемоний</div>
          <div class="promo-slider__button-holder">
            <a href="#" class="button">Подробнее</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "PromoSlider"
})
</script>

<style scoped>

</style>