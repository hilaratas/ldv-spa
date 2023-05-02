<template>
  <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Добавление новости</h1>
  <form action="#" id="news" class="form" @submit.prevent="onSubmit">
    <table class="form__table">
      <tbody>
      <news-input-row
        formName="news"
        inputName="news-img"
        label="Ссылку на картинку"
        description="Поле НЕобязательно к заполнению.
          Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.
          <br> Вес картинки не более 2Мб"
        v-model:controlValue="img"
        :errors="[]"
      >
      </news-input-row>
      <news-input-row
        formName="news"
        inputName="news-title"
        label="Заголовок новости *"
        description="Поле обязательно к заполнению"
        v-model:controlValue="title"
        :errors="v$.title.$errors"
      >
      </news-input-row>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="news-preview">Превью новости *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <editor v-model="preview" :api-key="tinymceKey"></editor>
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
          <editor v-model="text" :api-key="tinymceKey"></editor>
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
import {mapActions} from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Editor from '@tinymce/tinymce-vue'
import NewsInputRow from "@/components/News/NewsInputRow";

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
      text: '',
      isLoading: false,
      tinymceKey: process.env.VUE_APP_TINYMCE_API_KEY,
      isAlreadyCreated: false,
      fbId: ''
    }
  },
  validations() {
    return {
      title: { required },
      preview: { required },
      text: { required }
    }
  },
  computed: {
    needShowButtons() {
      if (!this.isAlreadyCreated) {
        return false
      }
      return !(this.img || this.title || this.preview || this.text)
    },
    tableName() {
      return this.$route.meta.tableName
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

      this.isLoading = true
      const res = await this.createNews({
        img: this.img,
        title: this.title,
        preview: this.preview,
        text: this.text,
        tableName: this.tableName
      })
      if (res.result) {
        this.isAlreadyCreated = true
        this.fbId = res.fbId
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