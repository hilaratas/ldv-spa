<template>
  <app-loading v-if="pageLoading"></app-loading>
  <template v-else>
    <div v-if="isAuth" class="row">
      <div class="col-auto">
        <router-link :to='"/" + tableName + "/add/"' class="button button--blue">Создать статью</router-link>
        <br><br>
      </div>
    </div>
    <news-list :news="news" :tableName="tableName">
      <template v-slot:EmptyNewsMsg>
        <div v-if="tableName === 'news'" class="title title--h3">
          На данный момент лента новостей пуста
        </div>
        <div v-if="tableName === 'specials_and_actions'" class="title title--h3">
          На данный момент акций и спецпредложений нет
        </div>
      </template>
    </news-list>
  </template>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import NewsList from "@/components/News/NewsList.vue";
import AppLoading from "@/components/AppLoading.vue";

export default {
  name: "ArticleList",
  data: () => ({
    news: [],
    pageLoading: true
  }),
  computed: {
    ...mapGetters('auth', ['isAuth']),
    tableName() {
      return this.$route.meta.tableName
    }
  },
  async mounted() {
    const res = await this.fetchNews(this.tableName)
    if (res.result ) {
      this.news = res.data
    }
    this.pageLoading = false
  },
  methods: {
    ...mapActions('news', ['fetchNews']),
  },
  components: { NewsList, AppLoading }
}
</script>