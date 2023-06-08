<template>
  <app-404 v-if="!isSectionExist">
    <div class="title title--h1">404</div>
    <div>Такаго раздела каталога не существует</div>
    <div v-if="isAdmin">
      <br>
      <router-link to="/catalog/add" class="button">Добавить раздел каталога</router-link>
    </div>
  </app-404>
  <form v-else action="#" :id="formName" class="form" @submit.prevent="onSubmit">
    <table class="form__table">
      <tbody>
      <news-input-row
          :formName="formName"
          inputName="catalog-img"
          label="Ссылку на картинку *"
          description="Поле обязательно к заполнению.
          Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.
          <br> Вес картинки не более 2Мб"
          v-model:controlValue="section.img"
          :errors="v$.img.$errors"
      >
      </news-input-row>
      <news-input-row
          :formName="formName"
          inputName="catalog-title"
          label="Заголовок раздела *"
          description="Поле обязательно к заполнению"
          v-model:controlValue="section.title"
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
                  <small class="">{{hru}}</small>
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
      <tr>
        <td class="form__table-cell"></td>
        <td class="form__table-cell form__table-cell--wide">
          <div class="row">
            <div class="col-auto">
              <button type="submit" :disabled="isFormLoading" :class="['button', {'is-loading': isFormLoading}]" >Отправить</button>
            </div>
            <div v-if="needShowButtons" class="col-auto">
              <router-link to="/catalog/" class="button">Посмотреть каталог</router-link>
            </div>
            <div v-if="needShowButtons" class="col-auto">
              <router-link :to="'/catalog/edit/' + hru" class="button">Редактировать раздел каталога</router-link>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
import {ref, computed, reactive, watch, onMounted, defineComponent} from "vue"
import { useStore } from "vuex"
import  { useRoute } from "vue-router"
import { useVuelidate } from '@vuelidate/core'
import { useRouter} from "vue-router";
import { required } from '@vuelidate/validators'
import { hruFilter } from "@/filter/hru.filter"
import App404 from "@/components/App404"
import NewsInputRow from "@/components/News/NewsInputRow"

export default defineComponent({
  name: "CatalogSectionAdd",
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const formName = "catalog-types"
    const routeHru = route.params.hru
    const isAdmin = computed(() => store.getters["auth/isAdmin"])
    const isHruValid = ref(true)
    const isFormLoading = ref(false)
    const isSectionExist = ref(false)
    const isAlreadyCreated = ref(false)
    const sectionRules = { img: {required}, title: {required} }
    const sectionDefault = { hru: '', img: '', title: '' }
    const section = reactive({...sectionDefault})
    const v$ = useVuelidate(sectionRules, section)
    const hru = computed(() => hruFilter(section.title))

    const needShowButtons = computed(() => (
        !isAlreadyCreated.value ?  false :  !(section.img || section.title )
      ))

    watch( hru, async (newHru) => {
      if (routeHru === newHru) {
        isHruValid.value = true
        return
      }
      isHruValid.value = await store.dispatch('catalog/isUniqueCatalogSection', newHru)
    })

    onMounted(async () => {
      const data = store.getters['catalog/catalogSection'](routeHru)
      if ( !data) {
        isSectionExist.value = false
      } else {
        isSectionExist.value = true
        Object.keys(section).map(key => section[key] = data[key] ?? section[key])
      }
    })

    const onSubmit = async () => {
      v$.value.$touch()
      if (v$.value.$error) {
        return;
      }

      isFormLoading.value = true
      const proms = []
      proms.push(store.dispatch('catalog/editCatalogSection', {...section, oldHru: routeHru, newHru: hru.value }))
      if ( routeHru !== hru.value ) {// сленился чпу секции, то надо чпу секции обновить у соответсвующих изделий
        proms.push( store.dispatch('product/changeSectionHru', {oldSectionHru: routeHru, newSectionHru: hru.value}) )
      }
      const results = await Promise.all(proms)
      const allGood = results.every(res => res.result === true)
      if (allGood) {
        isAlreadyCreated.value = true
        v$.value.$reset()
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: `Раздел каталога успешно отредактирован`,
          type: 'success',
          closable: true,
          autoClosable: false
        })
        await store.dispatch('catalog/fetchCatalogSections')
        await router.replace(`/catalog/edit/${hru.value}`)
      } else {
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка сервера при редактировании раздела каталога',
          type: 'error',
          closable: true,
          autoClosable: false
        })
      }
      isFormLoading.value = false
    }
    return {
      formName,
      section,
      hru,
      v$,
      isAdmin,
      isHruValid,
      isFormLoading,
      isSectionExist,
      isAlreadyCreated,
      needShowButtons,
      onSubmit
    }
  },
  components: { NewsInputRow, App404 }
})
</script>