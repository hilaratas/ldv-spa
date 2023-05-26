<template>
  <form action="#" :id="formName" class="form" @submit.prevent="onSubmit">
    <table class="form__table">
      <tbody>
      <news-input-row
          :formName="formName"
          inputName="product-title"
          label="Название изделия*"
          description="Поле обязательно к заполнению"
          v-model:controlValue="product.title"
          :errors="v$.title.$errors"
      >
      </news-input-row>
      <tr>
        <td class="form__table-cell">
          ЧПУ
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <div style="padding-bottom: 20px">
            <div class="input input--only-bottom">
              <div class="row" >
                <div class="col">
                  <small >{{hru}}</small>
                </div>
                <div class="col-auto">
                  <span v-if="isHruValid" class="check is-seccess">✔</span>
                  <span v-else class="check is-error">✘</span>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <news-input-row
          :formName="formName"
          inputName="product-img"
          label="Ссылку на картинку"
          description="Поле НЕобязательно к заполнению.
          Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.
          <br> Вес картинки не более 2Мб"
          v-model:controlValue="product.img"
          :errors="[]"
      >
      </news-input-row>
      <news-input-row
          :formName="formName"
          inputName="product-olp-price"
          inputType="number"
          label="Старая цена"
          description="Поле необязательно к заполнению"
          v-model:controlValue="product.title"
          :errors="[]"
      >
      </news-input-row>
      <news-input-row
          :formName="formName"
          inputName="product-price"
          inputType="number"
          label="Новая цена *"
          description="Поле обязательно к заполнению"
          v-model:controlValue="product.title"
          :errors="v$.title.$errors"
      >
      </news-input-row>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" >Цвета *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="row row--6px">
            <div class="col-auto">
              <label class="product-color"><input type="checkbox" name="product-color" value="black" checked="" v-model="product.colors"><span class="radio_attr_label">Черный</span></label>
            </div>
            <div class="col-auto">
              <label class="product-color"><input type="checkbox" name="product-color" value="silver" v-model="product.colors"><span class="radio_attr_label">Серебрянный</span></label>
            </div>
            <div class="col-auto">
              <label class="product-color"><input type="checkbox" name="product-color" value="copper" v-model="product.colors"><span class="radio_attr_label">Медный</span></label>
            </div>
          </div>
          <div class="control-error-holder">
            <div class="control-error" v-if="v$.colors.$errors.length">
              <div v-for="error of v$.colors.$errors">
                <div>{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div style="padding-bottom: 10px">
            <small class="control-description" id="product-color-disc">Поле обязательно к заполнению</small>
          </div>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" >Описание издения *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <editor v-model="product.desc" :api-key="tinymceKey" aria-describedby="product-desc-disc"></editor>
          <div class="control-error-holder">
            <div class="control-error" v-if="v$.desc.$errors.length">
              <div v-for="error of v$.desc.$errors">
                <div>{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div style="padding-bottom: 10px">
            <small class="control-description" id="product-desc-disc">Поле обязательно к заполнению</small>
          </div>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" >Раздел каталога *</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="select">
            <select name="product-section" id="product-section" class="select__select" aria-describedby="product-section-disc" v-model="product.catalogSection">
              <option value="" disabled>Выберите раздел</option>
              <option v-for="cat in catalogSections" value="cat.hru">{{cat.title}}</option>
            </select>
          </div>
          <div class="control-error-holder">
            <div class="control-error" v-if="v$.catalogSection.$errors.length">
              <div v-for="error of v$.catalogSection.$errors">
                <div>{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div style="padding-bottom: 10px">
            <small class="control-description" id="product-section-disc">Поле обязательно к заполнению</small>
          </div>
        </td>
      </tr>
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="row">
            <div class="col-auto">
              <button type="submit" :disabled="isFormLoading" :class="['button', {'is-loading': isFormLoading}]" >Отправить</button>
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
import { ref, reactive, computed  } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router/dist/vue-router";
import { useVuelidate } from '@vuelidate/core'
import { required } from "@vuelidate/validators";
import { hruFilter } from "@/filter/hru.filter";
import Editor from '@tinymce/tinymce-vue'
import NewsInputRow from "@/components/News/NewsInputRow.vue";

export default {
  name: "ProductAdd",
  setup() {
    const store = useStore()
    const route = useRoute()
    const formName = 'product'
    const productDefault = {
      title: '',
      img: '',
      oldPrice: '',
      price: '',
      colors: [],
      desc: '',
      sale: '',
      forOrder: '',
      catalogSection: ''
    }
    const productRules = {
      title: { required },
      img: { required },
      oldPrice: { required },
      price: { required },
      colors: { required },
      desc: { required },
      catalogSection: {required}
    }
    const product = reactive({...productDefault})
    const isHruValid = ref(false)
    const isPageLoading = ref(true)
    const isFormLoading = ref(false)
    const isAlreadyCreated = ref(false)
    const tinymceKey = process.env.VUE_APP_TINYMCE_API_KEY
    const v$ = useVuelidate(productRules, product)
    const hru = computed(() => hruFilter(product.title))
    const needShowButtons = computed(() => (
        !isAlreadyCreated.value ?
            false :
            !Object.values(product).any(value => value === '')
    ))
    const catalogSections = store.getters['catalog/catalogSections']


    return {
      hru,
      product,
      formName,
      isHruValid,
      isFormLoading,
      isPageLoading,
      isAlreadyCreated,
      needShowButtons,
      catalogSections,
      tinymceKey,
      v$
    }
  },
  components: { NewsInputRow, Editor }
}
</script>