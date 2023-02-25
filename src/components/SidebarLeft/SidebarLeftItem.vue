<template>
  <li class="main-menu__item">
    <router-link :to="item.item.link" class="main-menu__link">
      {{ item.item.text }}
    </router-link>
    <ul v-if="isFolder">
      <sidebar-left-item
          v-for="(model, index) in item.children"
          :key="index"
          :item="model">
      </sidebar-left-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: "SidebarLeftItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    }
  }
}
</script>

<style scoped>

</style>