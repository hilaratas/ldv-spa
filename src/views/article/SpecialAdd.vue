<template>
  <form action="#" id="news" class="form" @submit.prevent="onSubmit">
    <table class="form__table">
      <tbody>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="news-type">Это акция или <br>спецпредложение *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="select">
            <select
              name="news-type"
              id="news-type"
              class="select__select"
              v-model="article.type"
              aria-describedby="news-type-disc">
              <option value="action">Акция</option>
              <option value="special">Спецпредложение</option>
            </select>
          </div>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <small class="control-description" id="news-type-disc">Поле обязательно к заполнению</small>
        </td>
      </tr>
      <news-input-row
        formName="news"
        inputName="news-img"
        label="Ссылку на картинку"
        description="Поле НЕобязательно к заполнению.
          Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.
          <br> Вес картинки не более 2Мб"
        v-model:controlValue="article.img"
        :errors="[]"
      >
      </news-input-row>
      <news-input-row
        formName="news"
        inputName="news-title"
        label="Заголовок новости *"
        description="Поле обязательно к заполнению"
        v-model:controlValue="article.title"
        :errors="v$.title.$errors"
      >
      </news-input-row>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="news-preview">Превью новости *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <editor v-model="article.preview" :api-key="tinymceKey"></editor>
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
          <editor v-model="article.text" :api-key="tinymceKey"></editor>
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
import { computed, reactive, ref, onMounted} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Editor from '@tinymce/tinymce-vue'
import NewsInputRow from "@/components/News/NewsInputRow";


export default {
  name: "Add",
  setup () {
    const store = useStore()
    const route = useRoute()
    const tableName = route.meta.tableName
    const articleDefault = {
      img: '',
      title: '',
      preview: '',
      text: '',
      type: 'actions',
      tableName
    }
    const article = reactive({...articleDefault})
    const isLoading = ref(false)
    const isAlreadyCreated = ref(false)
    const fbId = ref('')
    const tinymceKey = process.env.VUE_APP_TINYMCE_API_KEY
    const articleRules = {
      title: { required },
      preview: { required },
      text: { required },
      type: { required },
      tableName: { required }
    }
    const v$ = useVuelidate(articleRules, article)
    const isAuth = store.getters["auth/isAuth"]
    const needShowButtons = computed(() => (
      !isAlreadyCreated.value ?
        false :
        !(article.img || article.title || article.preview || article.text)
      ))

    const resetForm = () => (
      Object.keys(article).map(key => article[key] = articleDefault[key])
    )

    const onSubmit = async () => {
      v$.value.$touch()
      if (v$.value.$error) {
        return;
      }

      isLoading.value = true
      const res = await store.dispatch('news/createNews', article)
      if (res.result) {
        isAlreadyCreated.value = true
        fbId.value = res.fbId
        resetForm()
      }
      isLoading.value = false
    }

    return {
      v$,
      fbId,
      isAuth,
      article,
      isLoading,
      needShowButtons,
      tinymceKey,
      tableName,
      onSubmit
    }
  },
  components: { Editor, NewsInputRow }
}
</script>
