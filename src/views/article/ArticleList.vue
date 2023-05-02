<template>
  <div class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Новости</div>
  <app-loading v-if="loading"></app-loading>
  <template v-else>
    <div v-if="isAuth" class="row">
      <div class="col-auto">
        <router-link :to='"/" + tableName + "/add/"' class="button button--blue">Создать статью</router-link>
        <br><br>
      </div>
    </div>
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
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters('auth', ['isAuth'])
  },
  mixins: [ ArticleListMixin ]
}
</script>

<style scoped>

</style>