<template>
  <article class="text">
    <p class="title title--h3 title--mb0">Welcome, гость!</p>
    <p>Ты находишься на моем экспериментальном проекте.</p>
    <p>Тут я: </p>
    <ul>
      <li>тестирую разные плагины и выбираю лучший;</li>
      <li>пробую запрограммировать новые фишки</li>
      <li>обучаюсь новым подходам</li>
      <li>вспомнаю забытое</li>
    </ul>

    <p>Постепенно сайт заполняется контентом, а <a href="https://github.com/hilaratas/ldv-spa" target="_blank">github</a> кодом</p>
    <p>Сайт был сверстан мной в 2018 году. Сейчас я не обращаю внимания на верстку и ее несовершенства, сосредоточена на javascript и vue3.</p>
    <p>Гуляй по сайту и не суди строго.</p>

    <h1 class="title title--h3 title--mb0">Ссылки на сверстанные страницы</h1>
    <ul>
      <li><router-link to="main">Главная</router-link></li>
      <li><router-link to="tech">Технический дизайн</router-link></li>
      <li><router-link to="blocks">Блоки</router-link></li>
      <li><router-link to="news">Новости</router-link>
        <ul>
          <li><router-link to="news/add">Добавить новость</router-link></li>
          <li><router-link to="news/edit/id">Редактировать новость</router-link></li>
        </ul>
      </li>
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
