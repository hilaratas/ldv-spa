<template>
  <app-loading v-if="pageLoading"></app-loading>
  <template v-else>
    <div v-if="!article">Новости с id = {{rticle.id}} не существует</div>
    <template v-else>
      <form action="#" id="news-edit" class="form" @submit.prevent="onSubmit">
        <table class="form__table">
          <tbody>
            <tr v-if="article.type">
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
            <tr v-if="article.type">
              <td class="form__table-cell"></td>
              <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
                <small class="control-description" id="news-type-disc">Поле обязательно к заполнению</small>
              </td>
            </tr>
            <news-input-row
                label="Ссылка на картинку"
                input-name="news-img"
                form-name="news-edit"
                description="Поле НЕобязательно к заполнению. Картинка в формате jpg, png, svg, webp.
                  Размер картинки не более 800*800px.
                  <br> Вес картинки не более 2Мб"
                :errors="[]"
                v-model:controlValue="article.img"
            >
            </news-input-row>
            <news-input-row
                label="Заголовок новости *"
                input-name="news-title"
                form-name="news-edit"
                description="Поле обязательно к заполнению"
                :errors="v$.title.$errors"
                v-model:controlValue="article.title"
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
                  <div class="col-auto">
                    <router-link :to='"/" + tableName + "/" + id' class="button">Смотреть</router-link>
                  </div>
                  <div class="col-auto">
                    <router-link :to='"/" + tableName + "/"' class="button">Список всех статей</router-link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </template>
  </template>


</template>

<script>
import { useStore} from 'vuex'
import { useRoute } from "vue-router";
import { useVuelidate } from '@vuelidate/core'
import { ref, reactive, onMounted } from "vue";
import { required } from '@vuelidate/validators'
import Editor from '@tinymce/tinymce-vue'
import NewsInputRow from "@/components/News/NewsInputRow";
import AppLoading from "@/components/AppLoading.vue";

// todo: Добавить typescript
export default {
  name: "ArticleEdit",
  setup () {
    const route = useRoute()
    const store = useStore()
    const id = route.params.id
    const tableName = route.meta.tableName
    const isLoading = ref(false)
    const pageLoading = ref(true)
    const tinymceKey = process.env.VUE_APP_TINYMCE_API_KEY

    const articleDefault = {
      id: route.params.id,
      img: '',
      title: '',
      preview: '',
      text: '',
      date: null,
      tableName: tableName
    }
    const articleRules = {
      title: { required },
      preview: { required },
      text: { required },
      tableName: { required }
    }
    if (tableName === 'specials_and_actions') {
      articleDefault.type = ''
      articleRules.type = { required }
    }

    const article = reactive({ ...articleDefault})
    const v$ = useVuelidate(articleRules, article)

    onMounted(async () => {
      const payload = { id, tableName }
      const res = await store.dispatch('news/fetchOneNewsById', payload)
      const {data} = res
      if (res.result) {
        Object.keys(article).map(key => article[key] = data[key] ?? article[key])
      } else {
        store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: `Ошибка ответа от сервера при получении новости с id=${res.data.id}`,
          type: 'error',
          closable: true,
          autoClosable: false
        })
      }
      pageLoading.value = false
    })

    const resetForm = () => (
      v$.value.$reset()
    )

    const onSubmit = async () => {
      v$.value.$touch()
      if (v$.value.$error)
        return

      isLoading.value = true
      const res = await store.dispatch('news/editOneNewsById',article)
      if (res.result) {
        resetForm()
        store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: `Статья успешно отредактирована. <br> Перейти к <a href="/${tableName}/${res.data.id}" class="js-click-push">просмотру</a>`,
          type: 'success',
          closable: true,
          autoClosable: false
        })
      } else {
        store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка ответа от сервера при редактировании новости',
          type: 'error',
          closable: true,
          autoClosable: false
        })
      }
      isLoading.value = false
    }

    return {
      id,
      article,
      pageLoading,
      tableName,
      isLoading,
      tinymceKey,
      v$,
      onSubmit
    }
  },
  components: { Editor, NewsInputRow, AppLoading }
}
</script>

<style scoped>

</style>