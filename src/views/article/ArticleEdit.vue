<template>
  <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Редактирование новости</h1>
  <div v-if="loading" class="loading"></div>
  <template v-else>
    <div v-if="!article">Новости с id = {{id}} не существует</div>
    <template v-else>
      <form action="#" id="news-edit" class="form" @submit.prevent="onSubmit">
        <table class="form__table">
          <tbody>
            <news-input-row
                label="Ссылка на картинку"
                input-name="news-img"
                form-name="news-edit"
                description="Поле НЕобязательно к заполнению. Картинка в формате jpg, png, svg, webp.
                  Размер картинки не более 800*800px.
                  <br> Вес картинки не более 2Мб"
                :errors="[]"
                v-model:controlValue="img"
            >
            </news-input-row>
            <news-input-row
                label="Заголовок новости *"
                input-name="news-title"
                form-name="news-edit"
                description="Поле обязательно к заполнению"
                :errors="v$.article.title.$errors"
                v-model:controlValue="article.title"
            >
            </news-input-row>
            <tr>
              <td class="form__table-cell form__table-cell--pr15px">
                <label class="nowrap" for="news-preview">Превью новости *</label>
              </td>
              <td class="form__table-cell form__table-cell--wide">
                <editor v-model="article.preview" :api-key="tinymceKey"></editor>
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
                <button type="submit" :disabled="isLoading" :class="['button', {'is-loading': isLoading}]" >Отправить</button>
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
import NewsInputRow from "@/components/News/NewsInputRow";

export default {
  name: "Edit",
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    id: '',
    img: '',
    loading: true,
    article: null,
    isLoading: false,
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
    const tableName = this.$route.meta.tableName
    const payload = {
      id: this.id,
      tableName
    }
    let data = await this.fetchOneNewsById(payload)
    this.img = data.img
    this.article = {
      title: data.title,
      preview: data.preview,
      text: data.text
    }
    this.loading = false
  },
  methods: {
    ...mapActions('news', ['fetchOneNewsById', 'editOneNewsById']),
    resetForm() {
      this.v$.$reset();
    },
    async onSubmit() {
      const tableName = this.$route.meta.tableName
      this.v$.$touch()
      if (this.v$.$error) {
        return;
      }

      this.isLoading = true
      const res = await this.editOneNewsById({
        id: this.id,
        img: this.img,
        tableName,
        ...this.article}
      )
      if (res) {
        this.resetForm()
      }
      this.isLoading = false
    }
  },
  components: { Editor, NewsInputRow }
}
</script>

<style scoped>

</style>