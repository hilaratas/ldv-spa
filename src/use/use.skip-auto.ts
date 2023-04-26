import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
import {DISABLED_INTERVAL, MAX_ATTEMPT_COUNT} from "@/config/skip-auto-config";

type authTypes = 'singUp' | 'singIn'

export function useSkipAuto (authType :authTypes) {
  const store = useStore()
  const attemptCount = ref(0)
  const isFormLoading = ref(false)
  const storeParam = `skipAuto/${authType}`
  const blockedUntil = computed(() => store.getters[storeParam])
  const blockedUntilDate = computed(() => new Date(blockedUntil.value))
  const isAttemptsExeed = computed(() => attemptCount.value >= MAX_ATTEMPT_COUNT)
  const isSubmitBlocked = computed( () => blockedUntilDate.value ? blockedUntilDate.value.getTime() > Date.now() : false)
  const isDisabled = computed(() => {
    isFormLoading.value || isSubmitBlocked.value
  })

  watch(isAttemptsExeed, (newValue: boolean) => {
    let newBlockedUntil;
    if (!newValue) {
      return
    }

    newBlockedUntil = new Date();
    newBlockedUntil.setMilliseconds(newBlockedUntil.getMilliseconds() + DISABLED_INTERVAL)
    store.dispatch('skipAuto/setParam', {'singUp' : newBlockedUntil})
    setTimeout(
      () => {
        attemptCount.value = 0
        store.dispatch('skipAuto/setParam', {'singUp': null})
      },
      DISABLED_INTERVAL
    )
  })

 return {
   isDisabled,
   isFormLoading,
   isSubmitBlocked,
   isAttemptsExeed,
   attemptCount,
   blockedUntilDate
 }
}
