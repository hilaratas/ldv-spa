<template>
  <div class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Новости</div>
  <app-loading v-if="loading"></app-loading>
  <template v-else>
    <div v-if="!news">
      На данный момент акций и спецпредложний нет
    </div>
    <news-list :news="news" v-else></news-list>
  </template>

</template>

<script>
import ArticleListMixin from "@/mixins/ArticleListMixin";

export default {
  mixins: [ ArticleListMixin ]
}
</script>

<style scoped>

</style>