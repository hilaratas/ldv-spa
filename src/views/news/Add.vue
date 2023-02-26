<template>
  <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Добавление новости</h1>
  <form action="#" id="news" class="form" @submit.prevent="onSubmit">
    <table class="form__table">
      <tbody>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="news-img">Ссылка на картинку</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <input
              class="input"
              name="news-img"
              id="news-img" v-model="img" aria-describedby="news-img-disc">
        </td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <small class="control-description" id="news-img-desc">
            Поле НЕобязательно к заполнению. Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.
            <br>
            Вес картинки не более 2Мб
          </small>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="news-title">Заголовок новости *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <input
              class="input"
              name="news-title"
              id="news-title"
              v-model="title"
              aria-describedby="news-title-disc"
              @input="v$.title.$touch"
          >
          <div class="control-error" v-if="v$.title.$errors.length">
            <div v-for="error of v$.title.$errors">
              <div>{{ error.$message }}</div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <small class="control-description" id="news-title-desc">Поле обязательно к заполнению</small>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="news-preview">Превью новости *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <textarea
              class="textarea"
              name="news-preview"
              id="news-preview"
              aria-describedby="news-preview-disc"
              v-model="preview"
              rows="2"
              @input="v$.preview.$touch"
          >
          </textarea>
          <div class="control-error" v-if="v$.preview.$errors.length">
            <div v-for="error of v$.preview.$errors">
              <div>{{ error.$message }}</div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <small class="control-description" id="news-preview-disc">Поле обязательно к заполнению</small>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="news-text">Текст новости *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <textarea
              class="textarea"
              name="news-text"
              id="news-text"
              aria-describedby="news-text-disc"
              v-model="text"
              rows="10"
              @input="v$.text.$touch"
          >
          </textarea>
          <div class="control-error" v-if="v$.text.$errors.length">
            <div v-for="error of v$.text.$errors">
              <div>{{ error.$message }}</div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <small class="control-description" id="news-text-disc">Поле обязательно к заполнению</small>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell"><label class="nowrap" for="news-title"></label></td>
        <td class="form__table-cell form__table-cell--wide"></td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide">
          <button type="submit" class="button" >Отправить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </form>

</template>

<script>
import {mapActions} from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: "Add",
  setup () {
    return { v$: useVuelidate() }
  },
  data: function () {
    return {
      img: '',
      title: '',
      preview: '',
      text: ''
    }
  },
  validations() {
    return {
      title: { required },
      preview: { required },
      text: { required }
    }
  },
  methods: {
    ...mapActions('news', ['createNews']),
    resetForm() {
      this.img = '';
      this.title = '';
      this.preview = '';
      this.text = '';
      this.v$.$reset();
    },
    async onSubmit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return;
      }

      const res = await this.createNews({
        img: this.img,
        title: this.title,
        preview: this.preview,
        text: this.text
      })
      if (res) {
        this.resetForm()
      }
    }
  }
}
</script>

<style scoped>

</style>