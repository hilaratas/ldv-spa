<template>
  <form action="#" :id="formName" class="form" @submit.prevent="onSubmit">
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
          <div class="row" style="padding-bottom: 10px">
            <div class="col">
              <small class="">{{hru}}</small>
            </div>
            <div class="col-auto">
              <span v-if="isHruValid" class="check is-seccess">✔</span>
              <span v-else class="check is-error">✘</span>
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
              <router-link :to="'/catalog/edit/' + reserveHru" class="button">Редактировать раздел каталога</router-link>
            </div>
          </div>

        </td>
      </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
import NewsInputRow from "@/components/News/NewsInputRow";
import {ref, computed, reactive, watch} from "vue"
import { useStore } from "vuex"
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { hruFilter } from "@/filter/hru.filter";

export default {
  name: "CatalogSectionAdd",
  setup() {
    const store = useStore()
    const formName = "catalog-types"
    const isFormLoading = ref(false)
    const sectionDefault = { img: "", title: "" }
    const sectionRules = {
          img: {required},
          title: {required}
        }
    const section = reactive({...sectionDefault})
    const v$ = useVuelidate(sectionRules, section)
    const hru = computed(() => hruFilter(section.title))
    let reserveHru = ''
    const isAlreadyCreated = ref(false)
    const needShowButtons = computed(() => (
        !isAlreadyCreated.value ?  false :  !(section.img || section.title )
      ))
    const isHruValid = ref(false)

    watch( hru, async (newHru) => {
      if ( !newHru ) {
        isHruValid.value = false
        return
      }
      isHruValid.value = await store.dispatch('catalog/isUniqueCatalogSection', newHru)
    })

    const resetForm = () => {
      Object.keys(section).map(key => section[key] = sectionDefault[key])
      v$.value.$reset()
    }

    const onSubmit = async () => {
      v$.value.$touch()
      if (v$.value.$error || !isHruValid.value) {
        return;
      }

      isFormLoading.value = true
      const res = await store.dispatch('catalog/createCatalogSection', {...section, hru: hru.value})
      if (res) {
        isAlreadyCreated.value = true
        resetForm()
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: `Новый раздел каталога успешно создан`,
          type: 'success',
          closable: true,
          autoClosable: false
        })
        await store.dispatch('catalog/fetchCatalogSections')
      } else {
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: 'Ошибка сервера при создании нового раздела каталога',
          type: 'error',
          closable: true,
          autoClosable: false
        })
      }
      isFormLoading.value = false
    }
    return {
      isFormLoading,
      formName,
      section,
      hru,
      v$,
      isAlreadyCreated,
      needShowButtons,
      onSubmit,
      isHruValid,
      reserveHru
    }
  },
  components: { NewsInputRow }
}
</script>

<style scoped>

</style>