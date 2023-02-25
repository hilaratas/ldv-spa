<template>
  <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Добавление новости</h1>
  <form action="#" id="news" class="form" @submit.prevent="onSubmit">
    <table class="form__table">
      <tbody>
      <tr>
        <td class="form__table-cell"><label class="nowrap" for="news-title">Заголовок новости</label></td>
        <td class="form__table-cell form__table-cell--wide"><input class="input" name="news-title" id="news-title" v-model="title"></td>
      </tr>
      <tr>
        <td class="form__table-cell"><label class="nowrap" for="news-preview">Превью новости</label></td>
        <td class="form__table-cell form__table-cell--wide"><textarea class="textarea" name="news-preview" id="news-preview" rows="2" v-model="preview"></textarea></td>
      </tr>
      <tr>
        <td class="form__table-cell"><label class="nowrap" for="news-text">Текст новости</label></td>
        <td class="form__table-cell form__table-cell--wide"><textarea class="textarea" name="news-text" id="news-text" rows="10" v-model="text"></textarea></td>
      </tr>
      <tr>
        <td class="form__table-cell"><label class="nowrap" for="news-title"></label></td>
        <td class="form__table-cell form__table-cell--wide"></td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide"><button type="submit" class="button">Отправить</button></td>
      </tr>
      </tbody>
    </table>
  </form>

</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Add",
  data: function() {
    return {
      title: '',
      preview: '',
      text: ''
    }
  },
  methods: {
    ...mapActions('news', ['createNews']),
    onSubmit() {
      console.log(this.title, this.preview, this.text)
      this.createNews({
        title: this.title,
        preview: this.preview,
        text: this.text
      })
    }
  }
}
</script>

<style scoped>

</style>