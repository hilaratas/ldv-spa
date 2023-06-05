<template>
  <div class="page__wrapper">
    <div class="page__inner">
      <div class="page__header">
        <header class="header">
          <div class="header__inner">
            <div class="header__gumburger">
              <button class="humb humb__htx humb--header" id="js-main-menu-toggle" aria-label="Главное меню" ref="menuButton">
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
                <div class="contact-us__btn">
                  <router-link v-if="!isAuth" class="contact-us__btn" to="/singin">
                    <span class="contact-us__text">Личный кабинет</span>
                  </router-link>
                  <router-link v-else class="contact-us__btn" to="/profile" >
                    <span class="contact-us__text">Профиль</span>
                  </router-link>
                  <ul v-if="isAuth" class="contact-us__drop">
                    <li class="contact-us__drop-item">
                      <a href="#" class="contact-us__drop-elem">Корзина</a>
                    </li>
                    <li class="contact-us__drop-item">
                      <a href="/" class="contact-us__drop-elem" @click="onClickLogout">Выйти</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </header>

        <the-sidebar-left></the-sidebar-left>

      </div>

      <div v-if="layout !== 'main'" class="page__middle">
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
          <section class="section section--index section--grow">
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

      <div v-else class="page__middle">
        <div class="page__middle-inner">
          <app-alerts></app-alerts>
          <router-view></router-view>
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
import {mapActions} from "vuex";
import TheSidebarLeft from '@/components/TheSidebarLeft.vue'
import TheBreadcrumbs from "@/components/TheBreadcrumbs.vue";
import TheSoc from '@/components/TheSoc.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppAlerts from "@/components/AppAlerts.vue";
import sideNav from '@/plugins/siveNav.plugin'


export default defineComponent({
  name: 'Home',
  data:() => ({
    isMainMenuOpen: false
  }),
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"]
    },
    layout() {
      return this.$route.meta.layout
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    onClickLogout() {
      this.logout()
      this.$router.push('/')
    }
  },
  mounted() {
    sideNav(document.getElementById('js-main-menu'))

  },
  components: {TheSidebarLeft, TheBreadcrumbs, TheFooter, TheSoc, AppAlerts}
})
</script>

<style lang="scss">
</style>
