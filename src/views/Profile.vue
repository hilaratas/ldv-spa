<template>
  <form action="#" id="profile" class="form" @submit.prevent="onSubmit">
    <table class="form__table">
      <tbody>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="profile-name">Имя</label>
        </td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <input class="input" type="text" name="profile-name" id="profile-name" v-model="name">
        </td>
      </tr>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="profile-surname">Фамилия</label>
        </td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <input class="input" type="text" name="profile-surname" id="profile-surname" v-model="surname">
        </td>
      </tr>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="profile-tel">Телефон</label>
        </td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <input class="input" type="tel" name="profile-tel" id="profile-tel" v-model="tel">
        </td>
      </tr>
      <tr>
        <td class="form__table-cell form__table-cell--pr15px">
          <label class="nowrap" for="profile-email">Email</label>
        </td>
        <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
          <input class="input" type="email" name="profile-email" id="profile-tel" v-model="email" readonly>
          <div v-if="!email_verified" style="padding-top: 10px">
            <small class="control-description"> Ваша почта не подтверждена. </small>
            <button class="button button--small button--blue" @click.prevent="onVerifyEmail">Подтвердить</button>
          </div>
          <div v-else style="padding-top: 10px">
            <span class="button button--small button--green">Ваша почта подтверждена</span>
          </div>
        </td>
      </tr>
      <td class="form__table-cell form__table-cell--pr15px"></td>
      <td class="form__table-cell form__table-cell--wide form__table-cell--pb10px">
        <button type="submit" :disabled="isFormLoading" :class="['button', {'is-loading': isFormLoading}]" >Отправить</button>
      </td>
      </tbody>
    </table>
  </form>
</template>

<script lang="ts">
import {useStore} from "vuex";
import {ref, computed, defineComponent} from "vue";

export default defineComponent({
  name: "Profile",
  setup() {
    const store = useStore()
    const authUserId = computed(() => store.getters['auth/userId'])
    const authUser = store.getters['auth/user']
    const profile = store.getters['profile/profile']
    const userId = ref(authUserId),
      name = ref(profile.name),
      surname = ref(profile.surname),
      tel = ref(profile.tel)
    const isFormLoading = ref(false)
    const email :string = ref(authUser.email),
      email_verified :boolean = ref(authUser.email_verified);

    async function onSubmit() {
      const profilePayload = {
        userId: authUserId.value,
        name: name.value,
        surname: surname.value,
        tel: tel.value
      }

      isFormLoading.value = true
      const res = await store.dispatch('profile/editProfile', profilePayload)
      if(res.result) {
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: "Ваш профиль отредактирован",
          type: 'success',
          closable: true,
          autoClosable: true
        })
      } else {
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: "Во время редактирования профиля произошла ошибка. <br> Пожалуйста, повторите попытку позже.",
          type: 'error',
          closable: true,
          autoClosable: true
        })
      }
      isFormLoading.value = false
    }

    async function onVerifyEmail() {
      const res = await store.dispatch('auth/verifyEmail')
      if(res.result) {
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: "На вашу почту отправлено письмо с кодом подтверждения",
          type: 'success',
          closable: true,
          autoClosable: false
        })
      } else {
        await store.dispatch('alerts/alertAdd', {
          id: Date.now(),
          text: "Во время отправки письма с кодом подтверждения произошла ошибка. <br> Повторите попытку позже",
          type: 'error',
          closable: true,
          autoClosable: false
        })
      }
    }
    return {
      name,
      surname,
      tel,
      email,
      email_verified,
      isFormLoading,
      onSubmit,
      onVerifyEmail
    }
  }
})
</script>