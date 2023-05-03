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
import ArticleListMixin from "@/mixins/ArticleListMixin";
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters('auth', ['isAuth']),
    tableName() {
      return this.$route.meta.tableName
    }
  },
  mixins: [ ArticleListMixin ]
}
</script>

<style scoped>

</style>