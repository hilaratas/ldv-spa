<template>
  <h1 class="title title--h1 title--white title--mb0 is-hidden" id="js-main-header">Авторизация</h1>
  <div v-if='isAuth' class="text" >
    <p>Вы уже авторизованы на сайте</p>
    <p>Можете продолжить гулять по сайту с помощью главного меню</p>
  </div>
  <form v-else action="#" :id="formId" class="form" @submit.prevent="onSubmit">

    <table class="form__table">
      <tbody>
      <news-input-row
        :formName="formId"
        inputName="email"
        label="Email *"
        description="Поле обязательно к заполнению"
        v-model:controlValue="form.email"
        :errors="v$.email.$errors"
      >
      </news-input-row>
      <news-input-row
        :formName="formId"
        inputName="password"
        label="Пароль *"
        description="Поле обязательно к заполнению"
        v-model:controlValue="form.password"
        :errors="v$.password.$errors"
      >
      </news-input-row>
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

<script lang="ts">
import {defineComponent, ref, reactive} from "vue";
import {useVuelidate} from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import NewsInputRow from "@/components/News/NewsInputRow.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";


export default defineComponent({
  name: "Auth",
  setup () {
    const store = useStore()
    const router = useRouter()
    const formId = ref('auth')
    const form = reactive({ email: '', password: '' })
    const formRules = {
      email: { required, email }, // Matches from.email
      password: { required, minLength: minLength(6) }, // Matches form.password
    }
    const v$ = useVuelidate(formRules, form)
    const isAuth = store.getters["auth/isAuth"]

    async function onSubmit() {
      v$.value.$touch()
      if (v$.value.$error) {
        return;
      }

      try {
        let result = await store.dispatch('auth/login', form)
        if (result)
          router.push('/news/add')
      } catch (e) {
      }
    }

    return {
      formId,
      form,
      v$,
      onSubmit,
      isAuth
    }
  },
  components: {NewsInputRow}
})
</script>