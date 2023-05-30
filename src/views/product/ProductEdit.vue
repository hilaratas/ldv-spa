<template>
  <app-loading v-if="isPageLoading"></app-loading>
  <form v-else action="#" :id="formName" class="form" @submit.prevent="onSubmit">
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
                  <small >{{prodHru}}</small>
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
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue"
import {useStore} from "vuex"
import {useRoute, useRouter} from "vue-router"
import {required} from "@vuelidate/validators"
import {useVuelidate} from "@vuelidate/core"
import {hruFilter} from "@/filter/hru.filter"
import Editor from '@tinymce/tinymce-vue'
import NewsInputRow from "@/components/News/NewsInputRow.vue"
import App404 from "@/components/App404.vue"
import AppLoading from "@/components/AppLoading.vue";

export default defineComponent({
  name: "ProductEdit",
  setup() {
    const store = useStore()
    const route = useRoute()
    const formName = "product-edit"
    const routeProdHru = route.params.prodHru
    const isAuth = computed(() => store.getters["auth/isAuth"])
    const isHruValid = ref(true)
    const isPageLoading = ref(true)
    const isFormLoading = ref(false)
    const isProdExist = ref(false)
    const isAlreadyCreated = ref(false)
    const tinymceKey = process.env.VUE_APP_TINYMCE_API_KEY
    const productRules = {
      title: { required },
      img: { required },
      oldPrice: { required },
      price: { required },
      colors: { required },
      desc: { required },
      catalogSection: {required}
    }
    const productDefault = {
      title: '',
      img: '',
      oldPrice: '',
      price: '',
      colors: [],
      desc: '',
      forOrder: '',
      catalogSection: '',
      pubDate: ''
    }
    const product = reactive({...productDefault})
    const v$ = useVuelidate(productRules, product)
    const prodHru = computed(() => hruFilter(product.title))
    const catalogSections = store.getters['catalog/catalogSections']
    const needShowButtons = computed(() => (
      !isAlreadyCreated.value ?  false :  !(product.img || product.title )
    ))

    watch( prodHru, async (newHru) => {
      if (routeProdHru === newHru) {
        isHruValid.value = true
        return
      }
      isHruValid.value = await store.dispatch('product/isUniqueProduct', newHru)
    })

    onMounted(async () => {
      const {data} = await store.dispatch('product/getProduct', routeProdHru)
      if ( !data) {
        isProdExist.value = false
      } else {
        isProdExist.value = true
        Object.keys(product).map(key => product[key] = data[key] ?? product[key])
      }
      isPageLoading.value = false
    })

    const onSubmit = async () => {
      v$.value.$touch()
      if (v$.value.$error) {
        return;
      }

      isFormLoading.value = true
      const res = await store.dispatch('product/editProduct', {
        ...product, oldProdHru: routeProdHru, newProdHru: prodHru.value })
      if (res) {
        isAlreadyCreated.value = true
        v$.value.$reset()
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: `Изделие успешно отредактировано.<br>
            Перейти в <a href="/catalog/${product.catalogSection}">каталог<br>
            Посмотреть <a href="/catalog/${product.catalogSection}/${prodHru.value}">изделие`,
          type: 'success',
          closable: true,
          autoClosable: false
        })
        await store.dispatch('catalog/fetchCatalogSections')

      } else {
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка сервера при редактировании изделия',
          type: 'error',
          closable: true,
          autoClosable: false
        })
      }
      isFormLoading.value = false
    }
    return {
      formName,
      product,
      prodHru,
      v$,
      isAuth,
      isHruValid,
      isFormLoading,
      isProdExist,
      isPageLoading,
      isAlreadyCreated,
      needShowButtons,
      tinymceKey,
      catalogSections,
      onSubmit
    }
  },
  components: { NewsInputRow, App404, AppLoading, Editor }
})
</script>