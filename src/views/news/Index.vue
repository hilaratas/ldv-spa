<template>
  <div class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Новости</div>
  <app-loading :loading="loading" v-if="loading"></app-loading>
  <template v-else>
    <div v-if="!news">
      На данный момент лента новостей пуста
    </div>
    <news-list :news="news" v-else></news-list>
  </template>

</template>

<script>
import NewsList from '@/components/News/NewsList'
import AppLoading from "@/components/AppLoading";
import {mapActions} from 'vuex';

export default {
  name: "News",
  data: () => ({
      news: [],
      loading: true
  }),
  async mounted() {
    this.news = await this.fetchNews()
    this.loading = false
  },
  methods: {
    ...mapActions('news', ['fetchNews'])
  },
  components: { NewsList, AppLoading }
}
</script>

<style scoped>

</style>