<template>
  <article class="text">
    <h1>Ссылки на сверстанные страницы</h1>
    <ul>
      <li><a href="main.html">Главная</a></li>
      <li><router-link to="tech">Технический дизайн</router-link></li>
      <li><router-link to="blocks">Блоки</router-link></li>
      <li><router-link to="news">Новости</router-link></li>
      <li><router-link to="alerts">Алерты</router-link></li>
      <li><router-link to="contacts">Контакты</router-link></li>
      <li><a href="blocks">Все блоки</a></li>
      <li><router-link to="catalog">Каталог</router-link></li>
      <li><router-link to="product">Продукт</router-link></li>
      <li>Корзина:
        <ul>
          <li><router-link to="cart">Список товаров</router-link></li>
          <li><router-link to="cart-address">Кто ты, где ты?</router-link></li>
          <li><router-link to="cart-dostavka">Доставка</router-link></li>
        </ul>
      </li>
    </ul>
  </article>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'

}
</script>
