<template>
  <div v-if="loading" class="loading"></div>
  <template v-else>
    <article class="article">
      <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">{{ article.title }}</h1>
      <figure class="figure" v-if="article.img">
        <img class="figure__img" src="/media/cc0-images/elephant-660-480.jpg" alt="Картинка">
        <figcaption class="figure__caption">Подпись для картинки</figcaption>
      </figure>
      <div class="article__text" v-html="article.text">
      </div>
    </article>

    <router-link :to=" '/news/edit/' + $route.params.id" class="button button--blue">Редактировать новость</router-link>
  </template>

</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "One",
  data: () => ({
    article: {
      id: null,
      img: '',
      title: '',
      preview: '',
      text: ''
    },
    error: '',
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
    const data = await this.fetchOneNewsById(this.id)
    this.loading = false

    if (!data) {
      this.error = `Новости с id = ${this.id} не существует`
      return
    }

    this.article = data


  }
}
</script>

<style scoped>

</style>