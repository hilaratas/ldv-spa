<template>
  <section class="index-first-screen">
    <div class="index-first-screen__inner">
      <promo-slider></promo-slider>
    </div>
  </section>
  <template v-if="!pageLoading && aboutList.length">
    <section class="section section--index">
      <h2 class="title title--h1 title--pretty">О нас</h2>
      <div class="section__wide">
        <news-list table-name="about" :news="aboutList"></news-list>
      </div>
    </section>
  </template>

  <section class="section section--index">
    <services></services>
  </section>
</template>

<script>
import {ref, defineComponent, onMounted} from "vue";
import {useStore} from 'vuex'
import PromoSlider from "../components/PromoSlider";
import NewsList from "@/components/News/NewsList";
import Services from "@/components/Main/Services";

export default defineComponent ({
  name: "Main",
  setup() {
    const store = useStore()
    const aboutTableName = 'about',
        pageLoading = ref(true)
    const aboutList = ref([])

    onMounted(async () => {
      const res = await store.dispatch('news/fetchNews', aboutTableName)
      if (res.result ) {
        aboutList.value = res.data
      }
      pageLoading.value = false
    })

    return {
      aboutList,
      pageLoading
    }
  },
  components: { PromoSlider, Services, NewsList}
})

</script>