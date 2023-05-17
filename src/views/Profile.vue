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
import { ref, computed, defineComponent} from "vue";

export default defineComponent({
  name: "Profile",
  setup() {
    const store = useStore()
    const authUserId = computed(() => store.getters['auth/userId'])
    const profile = store.getters['profile/profile']
    const userId= ref(authUserId),
      name = ref(profile.name || null ),
      surname = ref(profile.surname || null ),
      tel = ref(profile.tel || null)
    const isFormLoading = ref(false)

    const onSubmit = async () => {
      const profilePayload = {
        userId: authUserId.value,
        name: name.value,
        surname: surname.value,
        tel: tel.value
      }
      console.table(profilePayload)
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
    return {
      name,
      surname,
      tel,
      isFormLoading,
      onSubmit,
      profile
    }
  }
})
</script>