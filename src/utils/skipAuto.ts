import {skipAutoInterface, skipAutoItem} from "@/typings";

const ITEM_NAME: string = 'skipAuto'
const DEFAULT_VALUE = {
  auth: null,
  registration: null
}

export function getSkipAutoDate() : skipAutoInterface {
  const itemStr : string | null = localStorage.getItem(ITEM_NAME)
  if (!itemStr) {
    return {...DEFAULT_VALUE}
  } else {
    try {
      return JSON.parse(itemStr, (key, value) :skipAutoItem => (
        !value ? null : new Date(value)
      ))
    } catch (e) {
      return {...DEFAULT_VALUE}
    }
  }
}