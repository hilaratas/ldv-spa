<template>
  <div class="page__wrapper">
    <div class="page__inner">
      <div class="page__header">
        <header class="header">
          <div class="header__inner">
            <div class="header__gumburger">
              <button class="humb humb__htx humb--header" id="js-main-menu-toggle" aria-label="Главное меню" @click="toggleMainMenu">
                <span>Меню</span>
              </button>
            </div>
            <div class="header__middle">

              <div class="header__middle-inner">
                <the-soc></the-soc>
              </div>
            </div>
            <div class="header__bottom">
              <div class="contact-us">
                <router-link v-if="!isAuth" class="contact-us__btn" to="/auth">
                  <span class="contact-us__text">Личный кабинет</span>
                </router-link>
                <a v-else class="contact-us__btn" href="/" @click="onClickLogout">
                  <span class="contact-us__text">Выход</span>
                </a>
              </div>
            </div>
          </div>

        </header>

        <the-sidebar-left></the-sidebar-left>

      </div>

      <div class="page__middle">
        <div class="page__middle-inner">
          <app-alerts></app-alerts>
          <div class="section section--index">
            <div class="pretty-decor">
              <div class="pretty-decor__inner">
                <div class="section__inner">
                  <div id="js-main-header-holder"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="section section--index">
            <div class="section__inner">
              <the-breadcrumbs></the-breadcrumbs>
            </div>
          </div>

          <section class="section section--index">

            <div class="section__main-content">
              <div class="section__inner">
                <main class="main-content" role="main">
                  <router-view></router-view>
                </main>
              </div>
            </div> <!-- / .section__main-content -->

          </section>

        </div>
      </div>

      <div class="page__footer">
        <the-footer></the-footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TheSidebarLeft from '@/components/TheSidebarLeft.vue'
import TheBreadcrumbs from "@/components/TheBreadcrumbs.vue";
import TheSoc from '@/components/TheSoc.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppAlerts from "@/components/AppAlerts.vue";
import {mapActions} from "vuex";

export default defineComponent({
  name: 'Home',
  data:() => ({
    isMainMenuOpen: false
  }),
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"]
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    toggleMainMenu() {
      const html = document.documentElement
      html.classList.toggle('is-main-menu-open')
    },
    onClickLogout() {
      this.logout()
      this.$router.push('/')
    }
  },
  components: {TheSidebarLeft, TheBreadcrumbs, TheFooter, TheSoc, AppAlerts}
})
</script>

<style lang="scss">
</style>
