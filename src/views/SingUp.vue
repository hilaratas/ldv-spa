<template>
  <div v-if='isAuth' class="text" >
    <p>Вы авторизованы на сайте</p>
    <p>Чтобы создать нового пользователя, пожалуйста, <a href="#" @click="onClickLogout">разлогиньтесь</a></p>
  </div>
  <template v-else>
    <div class="text">
      <p>
        Если у вас уже есть учетная запись, вы можете <router-link to="/auth">авторизоваться</router-link>.
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
        <news-input-row
          :formName="formId"
          inputType="password"
          inputName="repeat_password"
          label="Повторите <br> пароль *"
          description="Поле обязательно к заполнению"
          v-model:controlValue="form.repeatPassword"
          :errors="v$.repeatPassword.$errors"
        >
        </news-input-row>
        <tr>
          <td class="form__table-cell"></td>
          <td class="form__table-cell form__table-cell--wide">
            <button type="submit"
                    :disabled="isFormLoading || isAttemptsExeed || isSubmitBlocked"
                    :class="['button', {'is-loading': isFormLoading}]" >
              Отправить
            </button>
            <div v-if="isSubmitBlocked">
              <br>
              <small  class="control-description is-error" >
                Превышено максимальное количество попыток зарегистрироваться. Возможность зарегистрироваться заблокирована до
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
import {defineComponent, ref, reactive, computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength, sameAs} from '@vuelidate/validators'
import NewsInputRow from "@/components/News/NewsInputRow.vue";
import {MAX_ATTEMPT_COUNT, DISABLED_INTERVAL} from '@/config/skip-auto-config'
import {dateTimeFilter} from "@/filter/dateTime.filter";
import {useSkipAuto} from "@/use/use.skip-auto";

export default defineComponent({
  name: "SingUp",
  setup() {
    const store = useStore()
    const router = useRouter()
    const formId = ref('auth')
    const form = reactive({ email: '', password: '', repeatPassword: '' })
    const formPassword = computed(() => form.password)
    const formRules = {
      email: { required, email }, // Matches from.email
      password: { required, minLength: minLength(6) }, // Matches form.password
      repeatPassword: { required, minLength: minLength(6) , sameAs: sameAs(formPassword)}
    }
    const v$ = useVuelidate(formRules, form)
    const isAuth = store.getters["auth/isAuth"]

    const { isDisabled, isFormLoading, isSubmitBlocked, isAttemptsExeed,
      blockedUntilDate, attemptCount} = {...useSkipAuto('singUp')}

    const onSubmit = async() => {
      v$.value.$touch()
      if (v$.value.$error) {
        return;
      }
      try {
        isFormLoading.value = true
        let result = await store.dispatch('auth/singUp', form)
        if (result)
          router.push('/news/add')
        else {
          attemptCount.value ++
        }
      } catch (e) {
      } finally {
        isFormLoading.value = false
      }
    }

    const onClickLogout = async() => {
      store.dispatch('auth/logout')
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
      onClickLogout,
      dateTimeFilter
    }
  },
  components: {NewsInputRow}
})
</script>