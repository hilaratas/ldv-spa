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
                <a class="contact-us__btn" href="#">Корзина</a>
              </div>
            </div>
          </div>

        </header>

        <the-sidebar-left></the-sidebar-left>

      </div>

      <div class="page__middle">
        <div class="page__middle-inner">
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

<script>
import TheSidebarLeft from '@/components/TheSidebarLeft'
import TheBreadcrumbs from "@/components/TheBreadcrumbs";
import TheSoc from '@/components/TheSoc'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'Home',
  data:() => ({
    isMainMenuOpen: false
  }),
  methods: {
    toggleMainMenu() {
      const html = document.documentElement
      html.classList.toggle('is-main-menu-open')
    }
  },
  components: {TheSidebarLeft, TheBreadcrumbs, TheFooter, TheSoc}
}
</script>

<style lang="scss">
</style>
