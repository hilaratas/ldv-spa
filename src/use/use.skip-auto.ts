import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
import {DISABLED_INTERVAL, MAX_ATTEMPT_COUNT} from "@/config/skip-auto-config";
import {skipAutoState} from "@/store/skipAuto/types";

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
    let newBlockedUntil = new Date();
    let payload = {}

    if (!newValue) {
      return
    }

    newBlockedUntil.setMilliseconds(newBlockedUntil.getMilliseconds() + DISABLED_INTERVAL)
    //@ts-ignore
    payload[authType] = newBlockedUntil

    store.dispatch('skipAuto/setParam', payload)
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
