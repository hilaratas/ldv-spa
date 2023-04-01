<template>
  <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Редактирование новости</h1>
  <div v-if="loading" class="loading"></div>
  <template v-else>
    <div v-if="!article">Новости с id = {{id}} не существует</div>
    <template v-else>
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
                  id="news-img" v-model="article.img" aria-describedby="news-img-disc">
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
                  v-model="article.title"
                  aria-describedby="news-title-disc"
                  @input="v$.article.title.$touch"
              >
              <div class="control-error" v-if="v$.article.title.$errors.length">
                <div v-for="error of v$.article.title.$errors">
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
              v-model="article.preview"
              rows="2"
              @input="v$.article.preview.$touch"
          >
          </textarea>
              <div class="control-error" v-if="v$.article.preview.$errors.length">
                <div v-for="error of v$.article.preview.$errors">
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
              <editor v-model="article.text" :api-key="tinymceKey"></editor>
              <div class="control-error" v-if="v$.article.text.$errors.length">
                <div v-for="error of v$.article.text.$errors">
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
  </template>


</template>

<script>
import {mapActions} from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "Edit",
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
      id: '',
      loading: true,
      article: null,
      tinymceKey: process.env.VUE_APP_TINYMCE_API_KEY,
  }),
  validations() {
    return {
      article: {
        title: {required},
        preview: {required},
        text: {required}
      }
    }
  },
  async mounted() {
    this.id = this.$route.params.id
    this.article = await this.fetchOneNewsById(this.id)
    this.loading = false
  },
  methods: {
    ...mapActions('news', ['fetchOneNewsById', 'editOneNewsById']),
    resetForm() {
      this.v$.$reset();
    },
    async onSubmit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return;
      }

      const res = await this.editOneNewsById({id: this.id, ...this.article})
      if (res) {
        this.resetForm()
      }
    }
  },
  components: { Editor }
}
</script>

<style scoped>

</style>