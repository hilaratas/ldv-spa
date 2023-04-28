import {RouteLocationNormalized} from "vue-router";

export function replaceHeader(route: RouteLocationNormalized) :void {
  const headerType :string = route.meta.headerType as string
  const headerText :string = route.meta.headerText as string
  const $$headerHolder = document.getElementById('js-main-header-holder');

  if (!$$headerHolder) {
    return
  }

  switch (headerType) {
    case 'static':
      $$headerHolder.innerHTML = `<h1 class="title title--h1 title--white title--mb0">${headerText}</h1>`
      break;
    default:
      $$headerHolder.innerHTML = `<div class="title title--h1 title--white title--mb0">${headerText}</div>`
  }
}