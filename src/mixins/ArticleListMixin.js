import {mapActions} from "vuex";
import NewsList from "@/components/News/NewsList";
import AppLoading from "@/components/AppLoading";

export default {
  name: "News",
    data: () => ({
  news: [],
  loading: true
}),
  async mounted() {
  const tableName = this.$route.meta.tableName
  this.news = await this.fetchNews(tableName)
  this.loading = false
},
  methods: {
  ...mapActions('news', ['fetchNews'])
  },
  components: { NewsList, AppLoading }
}
