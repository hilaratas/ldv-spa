import {mapActions} from "vuex";
import NewsList from "@/components/News/NewsList";
import AppLoading from "@/components/AppLoading";

export default {
  name: "News",
  data: () => ({
    news: [],
    pageLoading: true
  }),
  computed: {
    tableName() {
      return this.$route.meta.tableName
    }
  },
  async mounted() {
    this.news = await this.fetchNews(this.tableName)
    this.pageLoading = false
  },
  methods: {
  ...mapActions('news', ['fetchNews'])
  },
  components: { NewsList, AppLoading }
}
