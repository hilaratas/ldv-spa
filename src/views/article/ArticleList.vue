<template>
  <div class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Новости</div>
  <app-loading v-if="loading"></app-loading>
  <template v-else>
    <news-list :news="news" >
      <template v-slot:EmptyNewsMsg>
        <div class="title title--h3">
          На данный момент лента новостей пуста
        </div>
      </template>
    </news-list>
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