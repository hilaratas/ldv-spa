<template>
  <div v-if="loading" class="loading"></div>
</template>

<script>
export default {
  name: "AppLoading",
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>