<template>
  <nav class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item"><router-link to="/" class="breadcrumbs__link">Главная</router-link></li>
      <li class="breadcrumbs__item"><router-link to="/catalog" class="breadcrumbs__link">Каталог</router-link></li>
      <li class="breadcrumbs__item"><router-link to="/product" class="breadcrumbs__link">Флорариумы</router-link></li>
      <li class="breadcrumbs__item"><span class="breadcrumbs__link">Флорариум капля с пятиугольным основанием</span></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "TheBreadcrumbs"
}
</script>

<style scoped>

</style>