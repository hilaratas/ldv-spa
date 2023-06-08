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
              <div class="row">
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
          label="Ссылка на картинку"
          description="Поле обязательно к заполнению.
          Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.
          <br> Вес картинки не более 2Мб"
          v-model:controlValue="product.img"
          :errors="v$.img.$errors"
      >
      </news-input-row>
      <news-input-row
          :formName="formName"
          inputName="product-price"
          inputType="number"
          label="Новая цена *"
          description="Поле обязательно к заполнению"
          v-model:controlValue="product.price"
          :errors="v$.price.$errors"
      >
      </news-input-row>
      <news-input-row
          :formName="formName"
          inputName="product-olp-price"
          inputType="number"
          label="Старая цена"
          description="Поле необязательно к заполнению"
          v-model:controlValue="product.oldPrice"
          :errors="[]"
      >
      </news-input-row>
      <news-input-row
        :formName="formName"
        inputName="product-pubDate"
        inputType="date"
        label="Дата публикации"
        description="2 месяца со дня публикации изделия считается новым. <br>
          Если дата публикации больше текущей даты, продукт не отображается на сайте"
        v-model:controlValue="product.pubDate"
        :errors="[]"
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
          <label class="nowrap" for="product-forOrder">Под заказ</label>
        </td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="form__row">
            <label class="checkbox">
              <input type="checkbox" id="product-forOrder" name="product-forOrder" value="1" v-model="product.forOrder">
              <span class="checkbox__indicator"></span>
            </label>
          </div>
          <div style="padding-bottom: 10px">
            <small class="control-description" id="product-forOrder-disc">Поле необязательно к заполнению</small>
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
              <option v-for="(cat, key) in catalogSections" :value="key">{{cat.title}}</option>
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
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="row">
            <div class="col-auto">
              <button type="submit" :disabled="isFormLoading" :class="['button', {'is-loading': isFormLoading}]" >Отправить</button>
            </div>
            <div v-if="needShowButtons" class="col-auto">
              <router-link :to="'/catalog/' + reserveSection + '/' + reserveHru" class="button">Посмотреть продукт</router-link>
            </div>
            <div v-if="needShowButtons" class="col-auto">
              <router-link :to="'/catalog/product/edit/' + reserveHru" class="button">Редактировать продукт</router-link>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </form>

</template>

<script>
import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router/dist/vue-router";
import { useVuelidate } from '@vuelidate/core'
import { required } from "@vuelidate/validators";
import { hruFilter } from "@/filter/hru.filter";
import { isObjsIqual } from "@/utils/isObjsIqual";
import Editor from '@tinymce/tinymce-vue'
import NewsInputRow from "@/components/News/NewsInputRow.vue";
import {dateInputFormat} from "@/filter/dateInputFormat.filter";

export default {
  name: "ProductAdd",
  setup() {
    const store = useStore()
    const route = useRoute()
    const formName = 'product'
    const pubDate = new Date()
    const pubDateStr = dateInputFormat(pubDate)
    const productDefault = {
      title: '',
      img: '',
      oldPrice: '',
      price: '',
      colors: [],
      desc: '',
      sale: '',
      forOrder: '',
      catalogSection: '',
      pubDate: pubDateStr
    }
    const productRules = {
      title: { required },
      img: { required },
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
    const reserveSection = ref('')
    const reserveHru = ref('')
    const needShowButtons = computed(() => (
      !isAlreadyCreated.value ?
        false :  isObjsIqual(product, productDefault)
      ))
    const catalogSections = store.getters['catalog/catalogSections']

    watch( hru, async (newHru) => {
      if ( !newHru ) {
        isHruValid.value = false
        return
      }
      isHruValid.value = await store.dispatch('product/isUniqueProduct', newHru)
    })

    const resetForm = () => {
      Object.keys(product).map(key => product[key] = productDefault[key])
      v$.value.$reset()
    }

    const onSubmit = async () => {
      v$.value.$touch()
      if (v$.value.$error || !isHruValid.value) {
        return;
      }

      isFormLoading.value = true
      const res = await store.dispatch('product/createProduct', {
        ...product,
        pubDate: new Date(product.pubDate),
        hru: hru.value}
      )
      if (res.result) {
        isAlreadyCreated.value = true
        reserveHru.value = hru.value
        reserveSection.value = product.catalogSection
        resetForm()
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: `Новый продукт успешно создан<br>
            Перейти <a href="/catalog/${reserveSection.value}/${reserveHru.value}">просмотру.<br>
            Перейти к <a href="/${reserveSection.value}/">каталогу</a>.
          `,
          type: 'success',
          closable: true,
          autoClosable: false
        })
        await store.dispatch('catalog/fetchCatalogSections')
      } else {
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка сервера при создании нового продукта',
          type: 'error',
          closable: true,
          autoClosable: false
        })
      }
      isFormLoading.value = false
    }

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
      reserveHru,
      reserveSection,
      onSubmit,
      v$
    }
  },
  components: { NewsInputRow, Editor }
}
</script>