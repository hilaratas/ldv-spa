import {ProductColors, ProductColorTitles} from "@/typings";

const PRODUCT_COLORS :ProductColors[] = [ 'black', 'silver', 'copper']
const PRODUCT_COLOR_TITLES :ProductColorTitles = {
  ru: {
    black: 'Черный',
    silver: 'Серебрянный',
    copper: 'Медный'
  },
  eng: {
    black: 'Black',
    silver: 'Silver',
    copper: 'Copper'
  }
}

export {PRODUCT_COLORS, PRODUCT_COLOR_TITLES}
