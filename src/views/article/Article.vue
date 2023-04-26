<template>
  <app-loading v-if="loading"></app-loading>
  <template v-else>
    <app-404 v-if="error">
      <div class="title title--h1">404</div>
      <div>Новости с id={{id}} не существует</div>
    </app-404>
    <div v-else>
      <article class="article">
        <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">{{ article.title }}</h1>
        <figure class="figure" v-if="article.img">
          <img class="figure__img" src="https://i.pinimg.com/originals/db/82/00/db8200a7d1228e85847ed28395be039c.jpg" alt="Картинка">
          <figcaption class="figure__caption">Подпись для картинки</figcaption>
        </figure>
        <div class="article__text" v-html="article.text">
        </div>
      </article>
      <router-link :to=" '/news/edit/' + $route.params.id" class="button button--blue">Редактировать новость</router-link>
    </div>
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapActions} from 'vuex'
import AppLoading from '@/components/AppLoading.vue'
import App404 from "@/components/App404.vue";
import {ArticleFetchInfo} from "@/typings";

export default defineComponent({
  name: "One",
  data: () => ({
    article: {
      id: null,
      img: '',
      title: '',
      preview: '',
      text: ''
    },
    error: false,
    loading: true
  }),
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions('news', ['fetchOneNewsById'])
  },
  async mounted() {
    const payload = {
      id: this.id,
      tableName: this.$route.meta.tableName
    }
    const data = await this.fetchOneNewsById(payload)
    this.loading = false

    if (!data) {
      this.error = true
      return
    }

    this.article = data
  },
  components: {AppLoading, App404}
})
</script>