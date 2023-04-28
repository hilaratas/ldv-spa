<template>
  <div v-if='isAuth' class="text" >
    <p>Вы уже авторизованы на сайте</p>
    <p>Можете продолжить гулять по сайту с помощью главного меню</p>
  </div>
  <template v-else>
    <div class="text">
      <p>
        Если у вас еще нет учетной записи, вы можете <router-link to="singup">зарегистрироваться</router-link>.
      </p>
      <br>
    </div>
    <form action="#" :id="formId" class="form" novalidate @submit.prevent="onSubmit">
      <table class="form__table">
        <tbody>
        <news-input-row
          :formName="formId"
          inputType="email"
          inputName="email"
          label="Email *"
          description="Поле обязательно к заполнению"
          v-model:controlValue="form.email"
          :errors="v$.email.$errors"
        >
        </news-input-row>
        <news-input-row
          :formName="formId"
          inputType="password"
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
            <button type="submit"
                    :disabled="isFormLoading || isAttemptsExeed || isSubmitBlocked"
                    :class="['button', {'is-loading': isFormLoading}]" >Отправить</button>
            <div v-if="isSubmitBlocked">
              <br>
              <small  class="control-description is-error" >
                Превышено максимальное количество попыток авторизоваться. Возможность авторизоваться заблокирована до
                <span class="nowrap">{{dateTimeFilter(blockedUntilDate)}}</span>
              </small>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </form>
  </template>

</template>

<script lang="ts">
import {defineComponent, ref, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useSkipAuto} from "@/use/use.skip-auto";
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength } from '@vuelidate/validators'
import NewsInputRow from "@/components/News/NewsInputRow.vue";
import {dateTimeFilter} from "@/filter/dateTime.filter";

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

    const { isDisabled, isFormLoading, isSubmitBlocked, isAttemptsExeed,
      blockedUntilDate, attemptCount} = {...useSkipAuto('singIn')}

    async function onSubmit() {
      v$.value.$touch()
      if (v$.value.$error) {
        return;
      }

      try {
        isFormLoading.value = true
        let result = await store.dispatch('auth/login', form)
        if (result) {
          router.push('/news/add')
        } else {
          attemptCount.value ++
        }
      } catch (e) {
      } finally {
        isFormLoading.value = false
      }
    }

    return {
      formId,
      form,
      v$,
      isAuth,
      isDisabled,
      isFormLoading,
      isSubmitBlocked,
      isAttemptsExeed,
      blockedUntilDate,
      onSubmit,
      dateTimeFilter
    }
  },
  components: {NewsInputRow}
})
</script>