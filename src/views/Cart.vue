<template>
  <form action="">
    <table class="cart-table js-scroll-content">
      <tr class="cart-table__row">
        <td class="cart-table__cell is-header">Изображение</td>
        <td class="cart-table__cell is-header">Название</td>
        <td class="cart-table__cell is-header">Цена за единицу</td>
        <td class="cart-table__cell is-header">Количество</td>
        <td class="cart-table__cell is-header">Сумма</td>
      </tr>
      <tr class="cart-table__row js-cart-item">
        <td class="cart-table__cell">
          <div class="cart-table__picture-holder">
            <div class="pict">
              <div class="pict__img-holder pict__img-holder--1_1 pict__img-holder--loading pict__img-holder--border">
                <picture class="pict__picture">
                  <img class="pict__img" src="/example/product/img5.jpg" alt="Флорариум капля">
                </picture>
              </div>
            </div>
          </div>
        </td>
        <td class="cart-table__cell">
          <a href="#" class="link">Флорариум домик</a>
          <div class="cart-attrs">
            <ul class="cart-attrs__list">
              <li class="cart-attrs__item"><b>Цвет швов:</b> черный</li>
            </ul>
          </div>
          <div class="cart-attrs">
            <ul class="cart-attrs__list">
              <li class="cart-attrs__item"><b>Примечание:</b><br>
                <div class="cart-attrs__free">Какой-то текст</div>
              </li>
            </ul>
          </div>
        </td>
        <td class="cart-table__cell nowrap"><span class="js-cart-item__price">2000</span> Р</td>
        <td class="cart-table__cell">
          <div class="cart-quantity">
            <span class="cart-quantity__minus-holder"><button class="js-cart-item__minus cart-quantity__minus" type="button" disabled="disabled">-</button></span>
            <span class="cart-quantity__input-holder"><input type="number" class="input input--cart-quantity js-cart-item__quantity" min="1" name="quantity[0]" value="1"></span>
            <span class="cart-quantity__plus-holder"><button class="js-cart-item__plus cart-quantity__plus" type="button">+</button></span>
          </div>
          <div class="cart-table__update-holder">
            <button class="button button--update">
              <span class="visually-hidden">Обновить заказ</span>
              <span class="update-symbol"></span>
            </button>
          </div>
        </td>
        <td class="cart-table__cell">
          <span class="cart-table__sum-holder"><span class="js-cart-item__cost">2000</span> P</span>
          <div class="cart-table__delete-holder">
            <a class="button" href="#">&times;</a>
          </div>
        </td>
      </tr>
      <tr class="cart-table__row js-cart-item">
        <td class="cart-table__cell">
          <div class="cart-table__picture-holder">
            <div class="pict">
              <div class="pict__img-holder pict__img-holder--1_1 pict__img-holder--loading pict__img-holder--border">
                <picture class="pict__picture">
                  <img class="pict__img" src="/example/product/img5.jpg" alt="Флорариум капля">
                </picture>
              </div>
            </div>
          </div>
        </td>
        <td class="cart-table__cell">Флорариум типа капля</td>
        <td class="cart-table__cell">
          <span class="nowrap"><span class="js-cart-item__price">2000</span> Р</span>
        </td>
        <td class="cart-table__cell">
          <div class="cart-quantity">
            <span class="cart-quantity__minus-holder"><button class="js-cart-item__minus cart-quantity__minus" type="button">-</button></span>
            <span class="cart-quantity__input-holder"><input type="number" class="input input--cart-quantity js-cart-item__quantity" min="1" name="quantity[1]" value="10"></span>
            <span class="cart-quantity__plus-holder"><button class="js-cart-item__plus cart-quantity__plus" type="button" disabled="disabled">+</button></span>
          </div>
          <div class="cart-table__update-holder">
            <button class="button button--update">
              <span class="visually-hidden">Обновить заказ</span>
              <span class="update-symbol"></span>
            </button>
          </div>
        </td>
        <td class="cart-table__cell ">
          <span class="cart-table__sum-holder"><span class="js-cart-item__cost">2000</span> P</span>
          <div class="cart-table__delete-holder"><a class="button" href="#">&times;</a></div>
        </td>
      </tr>
      <tr class="cart-table__row">
        <td class="cart-table__cell cart-table__cell--text-right" colspan="4">
          <b>Итого:</b>
        </td>
        <td class="cart-table__cell">
          <span class="nowrap"><span class="js-cart-item__cost">22000</span> P</span><br>
        </td>
      </tr>
    </table>
  </form>

  <div class="mt-3">
    <div class="row row--mt10px">
      <div class="col"><a href="#" class="button button--blue">Вернуться в магазин</a></div>
      <div class="col-auto"><a href="#" class="button button--blue">Оформить заказ</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart"
}
</script>

<style scoped>

</style>