<template>
  <app-loading v-if="pageLoading"></app-loading>
  <template v-else>
    <app-404 v-if="error">
      <div class="title title--h1">404</div>
      <div>Новости с id={{id}} не существует</div>
      <div v-if="isAuth">
        <br>
        <router-link :to="'/' + tableName + '/add'" class="button">Добавить статью</router-link>
      </div>
    </app-404>
    <div v-else>
      <article class="article">
        <h1 class="title title--h3 title--blue">{{ article.title }}</h1>
        <div class="article__date-holder">
          <div class="article__date">{{articleDate}}</div>
        </div>
        <figure class="figure" v-if="article.img">
          <img class="figure__img" src="https://i.pinimg.com/originals/db/82/00/db8200a7d1228e85847ed28395be039c.jpg" alt="Картинка">
          <figcaption class="figure__caption">Подпись для картинки</figcaption>
        </figure>
        <div class="article__text" v-html="article.text">
        </div>
      </article>
      <div v-if="isAuth" class="row">
        <div class="col-auto">
          <router-link :to="'/' + tableName + '/edit/' + $route.params.id" class="button button--blue">Редактировать статью</router-link>
        </div>
        <div class="col-auto">
          <button class="button button--blue" data-fancybox data-src="#vue-article-delete">Удалить</button>
        </div>
      </div>


      <teleport to="#vue-modals-holder">
        <div id="vue-article-delete" class="popup" >
          <div class="popup__content">
            <div class="popup__header">
              <div class="popup__title">Удаление новости</div>
            </div>
            <div class="text">
              <p>Вы действительно хотитие удалить статью "{{ article.title }}"</p>
              <div class="row">
                <div class="col-auto">
                  <button class="button" @click="deleteNews">Да</button>
                </div>
                <div class="col-auto">
                  <button class="button button--blue" @click="closeFancy">Нет</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapActions, mapGetters} from 'vuex'
import AppLoading from '@/components/AppLoading.vue'
import App404 from "@/components/App404.vue";
import {ArticleFetchInfo} from "@/typings";
import type { Fancybox as FancyboxType } from "@fancyapps/ui/types";
import {dateFilter} from "@/filter/date.filter";
import * as Fancyapps from "@fancyapps/ui";
const Fancybox: typeof FancyboxType = Fancyapps.Fancybox;

export default defineComponent({
  name: "Article",
  data: () => ({
    article: {
      id: null,
      img: '',
      title: '',
      preview: '',
      text: '',
      date: null
    },
    error: false,
    pageLoading: true
  }),
  computed: {
    ...mapGetters('auth', ["isAuth"]),
    id() {
      return this.$route.params.id
    },
    tableName() {
      return this.$route.meta.tableName
    },
    articleDate() {
      return dateFilter(new Date(this.article.date ?? 0))
    }
  },
  methods: {
    ...mapActions('news', ['fetchOneNewsById', 'deleteOneNewsById']),
    async deleteNews() {
      Fancybox.close();
      const payload :ArticleFetchInfo = {
        id: this.id as string,
        tableName: this.tableName as string
      }
      await this.deleteOneNewsById(payload)
    },
    closeFancy() {
      Fancybox.close();
    }
  },
  async mounted() {
    const payload :ArticleFetchInfo = {
      id: this.id as string,
      tableName: this.tableName as string
    }
    const data = await this.fetchOneNewsById(payload)
    this.pageLoading = false

    if (!data) {
      this.error = true
      return
    }

    this.article = data
    Fancybox.bind('[data-fancybox]');
  },
  unmounted() {
    Fancybox.destroy();
  },
  components: {AppLoading, App404}
})
</script>