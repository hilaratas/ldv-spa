(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-198aeef4"],{"0408":function(e,t,c){"use strict";c.r(t);var o=c("7a23");const a=Object(o["createElementVNode"])("div",{class:"title title--h1"},"404",-1),l=Object(o["createElementVNode"])("div",null,"Такаго раздела каталога не существует",-1),r={key:0},n=Object(o["createElementVNode"])("br",null,null,-1),s=["id"],i={class:"form__table"},d=Object(o["createElementVNode"])("td",{class:"form__table-cell"}," ЧПУ ",-1),b={class:"form__table-cell form__table-cell--wide"},u={style:{"padding-bottom":"20px"}},m={class:"input input--only-bottom"},j={class:"row"},O={class:"col"},p={class:""},N={class:"col-auto"},v={key:0,class:"check is-seccess"},V={key:1,class:"check is-error"},f=Object(o["createElementVNode"])("td",{class:"form__table-cell"},null,-1),g={class:"form__table-cell form__table-cell--wide"},h={class:"row"},w={class:"col-auto"},E=["disabled"],k={key:0,class:"col-auto"},y={key:1,class:"col-auto"};function C(e,t,c,C,_,B){const S=Object(o["resolveComponent"])("router-link"),x=Object(o["resolveComponent"])("app-404"),$=Object(o["resolveComponent"])("news-input-row");return e.isSectionExist?(Object(o["openBlock"])(),Object(o["createElementBlock"])("form",{key:1,action:"#",id:e.formName,class:"form",onSubmit:t[2]||(t[2]=Object(o["withModifiers"])((...t)=>e.onSubmit&&e.onSubmit(...t),["prevent"]))},[Object(o["createElementVNode"])("table",i,[Object(o["createElementVNode"])("tbody",null,[Object(o["createVNode"])($,{formName:e.formName,inputName:"catalog-img",label:"Ссылку на картинку *",description:"Поле обязательно к заполнению.\r\n          Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.\r\n          <br> Вес картинки не более 2Мб",controlValue:e.section.img,"onUpdate:controlValue":t[0]||(t[0]=t=>e.section.img=t),errors:e.v$.img.$errors},null,8,["formName","controlValue","errors"]),Object(o["createVNode"])($,{formName:e.formName,inputName:"catalog-title",label:"Заголовок раздела *",description:"Поле обязательно к заполнению",controlValue:e.section.title,"onUpdate:controlValue":t[1]||(t[1]=t=>e.section.title=t),errors:e.v$.title.$errors},null,8,["formName","controlValue","errors"]),Object(o["createElementVNode"])("tr",null,[d,Object(o["createElementVNode"])("td",b,[Object(o["createElementVNode"])("div",u,[Object(o["createElementVNode"])("div",m,[Object(o["createElementVNode"])("div",j,[Object(o["createElementVNode"])("div",O,[Object(o["createElementVNode"])("small",p,Object(o["toDisplayString"])(e.hru),1)]),Object(o["createElementVNode"])("div",N,[e.isHruValid?(Object(o["openBlock"])(),Object(o["createElementBlock"])("span",v,"✔")):(Object(o["openBlock"])(),Object(o["createElementBlock"])("span",V,"✘"))])])])])])]),Object(o["createElementVNode"])("tr",null,[f,Object(o["createElementVNode"])("td",g,[Object(o["createElementVNode"])("div",h,[Object(o["createElementVNode"])("div",w,[Object(o["createElementVNode"])("button",{type:"submit",disabled:e.isFormLoading,class:Object(o["normalizeClass"])(["button",{"is-loading":e.isFormLoading}])},"Отправить",10,E)]),e.needShowButtons?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",k,[Object(o["createVNode"])(S,{to:"/catalog/",class:"button"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])("Посмотреть каталог")]),_:1})])):Object(o["createCommentVNode"])("",!0),e.needShowButtons?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",y,[Object(o["createVNode"])(S,{to:"/catalog/edit/"+e.hru,class:"button"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])("Редактировать раздел каталога")]),_:1},8,["to"])])):Object(o["createCommentVNode"])("",!0)])])])])])],40,s)):(Object(o["openBlock"])(),Object(o["createBlock"])(x,{key:0},{default:Object(o["withCtx"])(()=>[a,l,e.isAdmin?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",r,[n,Object(o["createVNode"])(S,{to:"/catalog/add",class:"button"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])("Добавить раздел каталога")]),_:1})])):Object(o["createCommentVNode"])("",!0)]),_:1}))}var _=c("5502"),B=c("6605"),S=c("c3b3"),x=c("b9fb"),$=c("8aa3"),A=c("40b5"),L=c("8edc"),T=Object(o["defineComponent"])({name:"CatalogSectionAdd",setup(){const e=Object(_["e"])(),t=Object(B["c"])(),c=(Object(B["d"])(),"catalog-types"),a=t.params.hru,l=Object(o["computed"])(()=>e.getters["auth/isAdmin"]),r=Object(o["ref"])(!0),n=Object(o["ref"])(!1),s=Object(o["ref"])(!1),i=Object(o["ref"])(!1),d={img:{required:x["c"]},title:{required:x["c"]}},b={hru:"",img:"",title:""},u=Object(o["reactive"])({...b}),m=Object(S["a"])(d,u),j=Object(o["computed"])(()=>Object($["a"])(u.title)),O=Object(o["computed"])(()=>!!i.value&&!(u.img||u.title));Object(o["watch"])(j,async t=>{r.value=a===t||await e.dispatch("catalog/isUniqueCatalogSection",t)}),Object(o["onMounted"])(async()=>{const t=e.getters["catalog/catalogSection"](a);t?(s.value=!0,Object.keys(u).map(e=>{var c;return u[e]=null!==(c=t[e])&&void 0!==c?c:u[e]})):s.value=!1});const p=async()=>{if(m.value.$touch(),m.value.$error)return;n.value=!0;const t=await e.dispatch("catalog/editCatalogSection",{...u,oldHru:a,newHru:j.value});t?(i.value=!0,m.value.$reset(),await e.dispatch("alerts/alertAdd",{id:Date.now(),text:"Раздел каталога успешно отредактирован",type:"success",closable:!0,autoClosable:!1}),await e.dispatch("catalog/fetchCatalogSections")):await e.dispatch("alerts/alertAdd",{id:Date.now(),text:"Ошибка сервера при редактировании раздела каталога",type:"error",closable:!0,autoClosable:!1}),n.value=!1};return{formName:c,section:u,hru:j,v$:m,isAdmin:l,isHruValid:r,isFormLoading:n,isSectionExist:s,isAlreadyCreated:i,needShowButtons:O,onSubmit:p}},components:{NewsInputRow:L["a"],App404:A["a"]}}),H=c("6b0d"),U=c.n(H);const q=U()(T,[["render",C]]);t["default"]=q},"40b5":function(e,t,c){"use strict";var o=c("7a23");const a=Object(o["createElementVNode"])("div",{class:"title title--h1"},"404",-1),l=Object(o["createElementVNode"])("div",null,[Object(o["createTextVNode"])("Запрашиваемый вами ресурс не найден. "),Object(o["createElementVNode"])("br"),Object(o["createTextVNode"])(" Воспользуйтесь главным меню для навигации по сайту ")],-1);function r(e,t,c,r,n,s){return Object(o["renderSlot"])(e.$slots,"default",{},()=>[a,l])}var n={name:"404"},s=c("6b0d"),i=c.n(s);const d=i()(n,[["render",r]]);t["a"]=d},"8aa3":function(e,t,c){"use strict";c.d(t,"a",(function(){return o}));c("14d9");function o(e){var t={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"e","ж":"j","з":"z","и":"i","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"shch","ы":"y","э":"e","ю":"u","я":"ya"," ":"-"},c=[];e=e.trim().replace(/[ъь]+/g,"").replace(/й/g,"i");for(var o=0;o<e.length;++o)c.push(t[e[o]]||void 0==t[e[o].toLowerCase()]&&e[o]||t[e[o].toLowerCase()].toUpperCase());return c.join("")}}}]);
//# sourceMappingURL=chunk-198aeef4.dd6c3484.js.map