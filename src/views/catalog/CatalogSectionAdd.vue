<template>
  <form action="#" :id="formName" class="form" @submit.prevent="onSubmit">
    <table class="form__table">
      <tbody>
      <news-input-row
          :formName="formName"
          inputName="catalog-img"
          label="Ссылку на картинку"
          description="Поле обязательно к заполнению.
          Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.
          <br> Вес картинки не более 2Мб"
          v-model:controlValue="section.img"
          :errors="v$.img.$errors"
      >
      </news-input-row>
      <news-input-row
          :formName="formName"
          inputName="catalog-title"
          label="Заголовок раздела *"
          description="Поле обязательно к заполнению"
          v-model:controlValue="section.title"
          :errors="v$.title.$errors"
      >
      </news-input-row>
      <tr>
        <td class="form__table-cell">
          ЧПУ
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="row">
            <div class="col-auto">
              <small class=""></small>
            </div>
            <div class="col">
              проверено
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="row">
            <div class="col-auto">
              <button type="submit" :disabled="isLoading" :class="['button', {'is-loading': isLoading}]" >Отправить</button>
            </div>
            <div v-if="needShowButtons" class="col-auto">
              <router-link :to="'/' + tableName + '/' + fbId" class="button">Посмотреть статью</router-link>
            </div>
            <div v-if="needShowButtons" class="col-auto">
              <router-link :to="'/' + tableName + '/edit/' + fbId" class="button">Редактировать статью</router-link>
            </div>
          </div>

        </td>
      </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
import NewsInputRow from "@/components/News/NewsInputRow";
import { reactive } from "vue"
import { useStore } from "vuex"
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: "CatalogSectionAdd",
  setup() {
    const store = useStore()
    const formName = "catalog-types",
        sectionDefault = {
          img: "",
          title: "",
          hru: ""
        },
        sectionRules = {
          img: {required},
          title: {required},
          hru: {required}
        },
        section = reactive({...sectionDefault})
        v$ = useVuelidate(section, sectionRules)
    return {
      formName,
      section
    }
  },
  components: { NewsInputRow }
}
</script>

<style scoped>

</style>