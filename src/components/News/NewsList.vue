<template>
  <div class="about" v-if="news.length">
    <div class="about__list">
      <div class="about__item" v-for="newsItem in news">
        <div class="about__bl">
          <div class="about__img-holder">
            <div class="about__img-wrapper">
              <div class="about__img-empty"></div>
              <div class="about__img-wrapper2">
                <picture class="about__pict">
                  <img :src="newsItem.img" alt="" class="about__img" v-if="newsItem.img">
                </picture>
              </div>
            </div>
          </div>
          <div class="about__text-holder">
            <div class="about__text-wrapper">
              <div class="about__title" v-html="newsItem.title">
              </div>
              <div class="about__text" v-html="newsItem.preview">
              </div>
              <div class="about__link-holder">
                <router-link :to="'/news/' + newsItem.id" class="button button--blue button--no-radius">Подробнее</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <slot name="EmptyNewsMsg">
      <p class="title title--h2">Новостей нет</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "NewsList",
  props: {
    news: Array
  }
}
</script>

<style scoped>

</style>