<template>
  <div class="sidebar sidebar--left" id="js-main-menu">
    <div class="sidebar__content">
      <div class="sidebar__inner" aria-hidden="true">
        <div class="sidebar__holder">
          <div class="sidebar__holder2">
            <div class="sidebar__holder3">
              <nav class="main-menu">
                <ul class="main-menu__list">
                  <sidebar-left-item :item="item" v-for="item in mainMenu"></sidebar-left-item>
                </ul>
              </nav>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import sidebarLeftMenu from "@/config/sidebar-left-menu";
import SidebarLeftItem from "@/components/SidebarLeft/SidebarLeftItem";
export default {
  name: "TheSidebarLeft",
  data() {
    return {
      mainMenu: {...sidebarLeftMenu}
    }
  },
  components: { SidebarLeftItem }
}
</script>

<style scoped>

</style>