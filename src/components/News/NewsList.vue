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
            <div v-if="newsItem.type" class="about__labels-holder">
              <div v-if="newsItem.type === 'special'" class="label">
                <div class="label__inner">Спец<wbr>предло<wbr>жение</div>
              </div>
              <div v-else class="label">
                <div class="label__inner">{{ARTICLE_TYPES[newsItem.type]}}</div>
              </div>
            </div>
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
import {ARTICLE_TYPES} from "@/config/article-types.config";

export default {
  name: "NewsList",
  props: {
    news: Array
  },
  data() {
    return {
      ARTICLE_TYPES: {...ARTICLE_TYPES}
    }
  }
}
</script>
