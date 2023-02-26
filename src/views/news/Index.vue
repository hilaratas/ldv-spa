<template>
  <template v-if="$route.params.id">
    <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Новости</h1>
    <h1>{{$route.params.id}}</h1>
  </template>
  <template v-else>
    <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Новости</h1>
    <news-list :news="news"></news-list>
  </template>
</template>

<script>
import NewsList from '@/components/News/NewsList'
import {mapActions} from 'vuex';

export default {
  name: "News",
  data: function() {
    return {
      news: []
    }
  },
  async mounted() {
    if ( !this.$route.params.id ) {
      this.news = await this.fetchNews()
    }
  },
  methods: {
    ...mapActions('news', ['fetchNews'])
  },
  components: { NewsList }
}
</script>

<style scoped>

</style>