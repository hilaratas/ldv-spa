<template>
  <app-loading v-if="pageLoading"></app-loading>
  <template v-else>
    <div v-if="isAdmin" class="row">
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
        <div v-if="tableName === 'about'" class="title title--h3">
          Пока нам нечего о себе рассказать
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
    ...mapGetters('auth', ['isAdmin']),
    tableName() {
      return this.$route.meta.tableName
    }
  },
  async beforeRouteEnter(to, from, next) {
    next( async vm => {
      const res = await vm.fetchNews(vm.tableName)
      if (res.result ) {
        vm.news = res.data
      }
      vm.pageLoading = false
    })
  },
  methods: {
    ...mapActions('news', ['fetchNews']),
  },
  components: { NewsList, AppLoading }
}
</script>