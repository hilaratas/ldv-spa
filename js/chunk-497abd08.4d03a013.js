(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-497abd08"],{"131c":function(e,t,o){"use strict";o.r(t);var c=o("7a23");const r=Object(c["createElementVNode"])("div",{class:"title title--h1"},"404",-1),n=Object(c["createElementVNode"])("div",null,"Такаго изделия не существует",-1),l={key:0},a=Object(c["createElementVNode"])("br",null,null,-1),i=["id"],d={class:"form__table"},s=Object(c["createElementVNode"])("td",{class:"form__table-cell"}," ЧПУ ",-1),u={class:"form__table-cell form__table-cell--wide"},b={style:{"padding-bottom":"20px"}},m={class:"input input--only-bottom"},p={class:"row"},O={class:"col"},j={class:"col-auto"},f={key:0,class:"check is-seccess"},v={key:1,class:"check is-error"},V=Object(c["createElementVNode"])("td",{class:"form__table-cell form__table-cell--pr15px"},[Object(c["createElementVNode"])("label",{class:"nowrap"},"Цвета *")],-1),N={class:"form__table-cell form__table-cell--wide"},g={class:"row row--6px"},E={class:"col-auto"},y={class:"product-color"},h=Object(c["createElementVNode"])("span",{class:"radio_attr_label"},"Черный",-1),k={class:"col-auto"},w={class:"product-color"},_=Object(c["createElementVNode"])("span",{class:"radio_attr_label"},"Серебрянный",-1),C={class:"col-auto"},B={class:"product-color"},S=Object(c["createElementVNode"])("span",{class:"radio_attr_label"},"Медный",-1),x={class:"control-error-holder"},D={key:0,class:"control-error"},$=Object(c["createElementVNode"])("div",{style:{"padding-bottom":"10px"}},[Object(c["createElementVNode"])("small",{class:"control-description",id:"product-color-disc"},"Поле обязательно к заполнению")],-1),P=Object(c["createElementVNode"])("td",{class:"form__table-cell form__table-cell--pr15px"},[Object(c["createElementVNode"])("label",{class:"nowrap",for:"product-forOrder"},"Под заказ")],-1),L={class:"form__table-cell form__table-cell--wide"},U={class:"form__row"},A={class:"checkbox"},M=Object(c["createElementVNode"])("span",{class:"checkbox__indicator"},null,-1),F=Object(c["createElementVNode"])("div",{style:{"padding-bottom":"10px"}},[Object(c["createElementVNode"])("small",{class:"control-description",id:"product-forOrder-disc"},"Поле необязательно к заполнению")],-1),H=Object(c["createElementVNode"])("td",{class:"form__table-cell form__table-cell--pr15px"},[Object(c["createElementVNode"])("label",{class:"nowrap"},"Раздел каталога *")],-1),T={class:"form__table-cell form__table-cell--wide"},q={class:"select"},I=Object(c["createElementVNode"])("option",{value:"",disabled:""},"Выберите раздел",-1),R=["value"],K={class:"control-error-holder"},z={key:0,class:"control-error"},G=Object(c["createElementVNode"])("div",{style:{"padding-bottom":"10px"}},[Object(c["createElementVNode"])("small",{class:"control-description",id:"product-section-disc"},"Поле обязательно к заполнению")],-1),J=Object(c["createElementVNode"])("td",{class:"form__table-cell form__table-cell--pr15px"},[Object(c["createElementVNode"])("label",{class:"nowrap"},"Описание издения *")],-1),Q={class:"form__table-cell form__table-cell--wide"},W={class:"control-error-holder"},X={key:0,class:"control-error"},Y=Object(c["createElementVNode"])("div",{style:{"padding-bottom":"10px"}},[Object(c["createElementVNode"])("small",{class:"control-description",id:"product-desc-disc"},"Поле обязательно к заполнению")],-1),Z=Object(c["createElementVNode"])("td",{class:"form__table-cell"},null,-1),ee={class:"form__table-cell form__table-cell--wide"},te={class:"row"},oe={class:"col-auto"},ce=["disabled"],re={key:0,class:"col-auto"},ne={key:1,class:"col-auto"};function le(e,t,o,le,ae,ie){const de=Object(c["resolveComponent"])("app-loading"),se=Object(c["resolveComponent"])("router-link"),ue=Object(c["resolveComponent"])("app-404"),be=Object(c["resolveComponent"])("news-input-row"),me=Object(c["resolveComponent"])("editor");return e.isPageLoading?(Object(c["openBlock"])(),Object(c["createBlock"])(de,{key:0})):(Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],{key:1},[e.isProdExist?(Object(c["openBlock"])(),Object(c["createElementBlock"])("form",{key:1,action:"#",id:e.formName,class:"form",onSubmit:t[11]||(t[11]=Object(c["withModifiers"])((...t)=>e.onSubmit&&e.onSubmit(...t),["prevent"]))},[Object(c["createElementVNode"])("table",d,[Object(c["createElementVNode"])("tbody",null,[Object(c["createVNode"])(be,{formName:e.formName,inputName:"product-title",label:"Название изделия*",description:"Поле обязательно к заполнению",controlValue:e.product.title,"onUpdate:controlValue":t[0]||(t[0]=t=>e.product.title=t),errors:e.v$.title.$errors},null,8,["formName","controlValue","errors"]),Object(c["createElementVNode"])("tr",null,[s,Object(c["createElementVNode"])("td",u,[Object(c["createElementVNode"])("div",b,[Object(c["createElementVNode"])("div",m,[Object(c["createElementVNode"])("div",p,[Object(c["createElementVNode"])("div",O,[Object(c["createElementVNode"])("small",null,Object(c["toDisplayString"])(e.prodHru),1)]),Object(c["createElementVNode"])("div",j,[e.isHruValid?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",f,"✔")):(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",v,"✘"))])])])])])]),Object(c["createVNode"])(be,{formName:e.formName,inputName:"product-img",label:"Ссылка на картинку",description:"Поле обязательно к заполнению.\r\n          Картинка в формате jpg, png, svg, webp. Размер картинки не более 800*800px.\r\n          <br> Вес картинки не более 2Мб",controlValue:e.product.img,"onUpdate:controlValue":t[1]||(t[1]=t=>e.product.img=t),errors:e.v$.img.$errors},null,8,["formName","controlValue","errors"]),Object(c["createVNode"])(be,{formName:e.formName,inputName:"product-olp-price",inputType:"number",label:"Старая цена",description:"Поле необязательно к заполнению",controlValue:e.product.oldPrice,"onUpdate:controlValue":t[2]||(t[2]=t=>e.product.oldPrice=t),errors:[]},null,8,["formName","controlValue"]),Object(c["createVNode"])(be,{formName:e.formName,inputName:"product-price",inputType:"number",label:"Новая цена *",description:"Поле обязательно к заполнению",controlValue:e.product.price,"onUpdate:controlValue":t[3]||(t[3]=t=>e.product.price=t),errors:e.v$.price.$errors},null,8,["formName","controlValue","errors"]),Object(c["createVNode"])(be,{formName:e.formName,inputName:"product-pubDate",inputType:"date",label:"Дата публикации",description:"2 месяца со дня публикации изделия считается новым. <br>\r\n          Если дата публикации больше текущей даты, продукт не отображается на сайте",controlValue:e.product.pubDate,"onUpdate:controlValue":t[4]||(t[4]=t=>e.product.pubDate=t),errors:[]},null,8,["formName","controlValue"]),Object(c["createElementVNode"])("tr",null,[V,Object(c["createElementVNode"])("td",N,[Object(c["createElementVNode"])("div",g,[Object(c["createElementVNode"])("div",E,[Object(c["createElementVNode"])("label",y,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"checkbox",name:"product-color",value:"black",checked:"","onUpdate:modelValue":t[5]||(t[5]=t=>e.product.colors=t)},null,512),[[c["vModelCheckbox"],e.product.colors]]),h])]),Object(c["createElementVNode"])("div",k,[Object(c["createElementVNode"])("label",w,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"checkbox",name:"product-color",value:"silver","onUpdate:modelValue":t[6]||(t[6]=t=>e.product.colors=t)},null,512),[[c["vModelCheckbox"],e.product.colors]]),_])]),Object(c["createElementVNode"])("div",C,[Object(c["createElementVNode"])("label",B,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"checkbox",name:"product-color",value:"copper","onUpdate:modelValue":t[7]||(t[7]=t=>e.product.colors=t)},null,512),[[c["vModelCheckbox"],e.product.colors]]),S])])]),Object(c["createElementVNode"])("div",x,[e.v$.colors.$errors.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",D,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.v$.colors.$errors,e=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",null,[Object(c["createElementVNode"])("div",null,Object(c["toDisplayString"])(e.$message),1)]))),256))])):Object(c["createCommentVNode"])("",!0)]),$])]),Object(c["createElementVNode"])("tr",null,[P,Object(c["createElementVNode"])("td",L,[Object(c["createElementVNode"])("div",U,[Object(c["createElementVNode"])("label",A,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"checkbox",id:"product-forOrder",name:"product-forOrder",value:"1","onUpdate:modelValue":t[8]||(t[8]=t=>e.product.forOrder=t)},null,512),[[c["vModelCheckbox"],e.product.forOrder]]),M])]),F])]),Object(c["createElementVNode"])("tr",null,[H,Object(c["createElementVNode"])("td",T,[Object(c["createElementVNode"])("div",q,[Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{name:"product-section",id:"product-section",class:"select__select","aria-describedby":"product-section-disc","onUpdate:modelValue":t[9]||(t[9]=t=>e.product.catalogSection=t)},[I,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.catalogSections,(e,t)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("option",{value:t},Object(c["toDisplayString"])(e.title),9,R))),256))],512),[[c["vModelSelect"],e.product.catalogSection]])]),Object(c["createElementVNode"])("div",K,[e.v$.catalogSection.$errors.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",z,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.v$.catalogSection.$errors,e=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",null,[Object(c["createElementVNode"])("div",null,Object(c["toDisplayString"])(e.$message),1)]))),256))])):Object(c["createCommentVNode"])("",!0)]),G])]),Object(c["createElementVNode"])("tr",null,[J,Object(c["createElementVNode"])("td",Q,[Object(c["createVNode"])(me,{modelValue:e.product.desc,"onUpdate:modelValue":t[10]||(t[10]=t=>e.product.desc=t),"api-key":e.tinymceKey,"aria-describedby":"product-desc-disc"},null,8,["modelValue","api-key"]),Object(c["createElementVNode"])("div",W,[e.v$.desc.$errors.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",X,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.v$.desc.$errors,e=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",null,[Object(c["createElementVNode"])("div",null,Object(c["toDisplayString"])(e.$message),1)]))),256))])):Object(c["createCommentVNode"])("",!0)]),Y])]),Object(c["createElementVNode"])("tr",null,[Z,Object(c["createElementVNode"])("td",ee,[Object(c["createElementVNode"])("div",te,[Object(c["createElementVNode"])("div",oe,[Object(c["createElementVNode"])("button",{type:"submit",disabled:e.isFormLoading,class:Object(c["normalizeClass"])(["button",{"is-loading":e.isFormLoading}])},"Отправить",10,ce)]),e.needShowButtons?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",re,[Object(c["createVNode"])(se,{to:"/catalog/"+e.reserveSection+"/"+e.reserveHru,class:"button"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])("Посмотреть продукт")]),_:1},8,["to"])])):Object(c["createCommentVNode"])("",!0),e.needShowButtons?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",ne,[Object(c["createVNode"])(se,{to:"/catalog/product/edit/"+e.reserveHru,class:"button"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])("Редактировать продукт")]),_:1},8,["to"])])):Object(c["createCommentVNode"])("",!0)])])])])])],40,i)):(Object(c["openBlock"])(),Object(c["createBlock"])(ue,{key:0},{default:Object(c["withCtx"])(()=>[r,n,e.isAuth?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",l,[a,Object(c["createVNode"])(se,{to:"/catalog/product/add",class:"button"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])("Добавить новое изделие")]),_:1})])):Object(c["createCommentVNode"])("",!0)]),_:1}))],64))}var ae=o("5502"),ie=o("6605"),de=o("b9fb"),se=o("c3b3"),ue=o("8aa3"),be=o("ca72"),me=o("8edc"),pe=o("40b5"),Oe=o("29e5"),je=Object(c["defineComponent"])({name:"ProductEdit",setup(){const e=Object(ae["e"])(),t=Object(ie["c"])(),o="product-edit",r=t.params.prodHru,n=Object(c["computed"])(()=>e.getters["auth/isAuth"]),l=Object(c["ref"])(!0),a=Object(c["ref"])(!0),i=Object(c["ref"])(!1),d=Object(c["ref"])(!1),s=Object(c["ref"])(!1),u="7iaejq0tnr1x4prtla31ao35f0mcyy7avktxha787dhulfac",b={title:{required:de["c"]},img:{required:de["c"]},oldPrice:{required:de["c"]},price:{required:de["c"]},colors:{required:de["c"]},desc:{required:de["c"]},catalogSection:{required:de["c"]}},m={title:"",img:"",oldPrice:"",price:"",colors:[],desc:"",forOrder:"",catalogSection:"",pubDate:""},p=Object(c["reactive"])({...m}),O=Object(se["a"])(b,p),j=Object(c["computed"])(()=>Object(ue["a"])(p.title)),f=e.getters["catalog/catalogSections"],v=Object(c["computed"])(()=>!!s.value&&!(p.img||p.title));Object(c["watch"])(j,async t=>{l.value=r===t||await e.dispatch("product/isUniqueProduct",t)}),Object(c["onMounted"])(async()=>{const{data:t}=await e.dispatch("product/getProduct",r);t?(d.value=!0,Object.keys(p).map(e=>{var o;return p[e]=null!==(o=t[e])&&void 0!==o?o:p[e]})):d.value=!1,a.value=!1});const V=async()=>{if(O.value.$touch(),O.value.$error)return;i.value=!0;const t=await e.dispatch("product/editProduct",{...p,oldProdHru:r,newProdHru:j.value});t?(s.value=!0,O.value.$reset(),await e.dispatch("alerts/alertAdd",{id:Date.now(),text:`Изделие успешно отредактировано.<br>\n            Перейти в <a href="/catalog/${p.catalogSection}">каталог<br>\n            Посмотреть <a href="/catalog/${p.catalogSection}/${j.value}">изделие`,type:"success",closable:!0,autoClosable:!1}),await e.dispatch("catalog/fetchCatalogSections")):await e.dispatch("alerts/alertAdd",{id:Date.now(),text:"Ошибка сервера при редактировании изделия",type:"error",closable:!0,autoClosable:!1}),i.value=!1};return{formName:o,product:p,prodHru:j,v$:O,isAuth:n,isHruValid:l,isFormLoading:i,isProdExist:d,isPageLoading:a,isAlreadyCreated:s,needShowButtons:v,tinymceKey:u,catalogSections:f,onSubmit:V}},components:{NewsInputRow:me["a"],App404:pe["a"],AppLoading:Oe["a"],Editor:be["a"]}}),fe=o("6b0d"),ve=o.n(fe);const Ve=ve()(je,[["render",le]]);t["default"]=Ve},"29e5":function(e,t,o){"use strict";var c=o("7a23");const r={class:"loading"};function n(e,t,o,n,l,a){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",r)}var l={name:"AppLoading"},a=o("6b0d"),i=o.n(a);const d=i()(l,[["render",n]]);t["a"]=d},"40b5":function(e,t,o){"use strict";var c=o("7a23");const r=Object(c["createElementVNode"])("div",{class:"title title--h1"},"404",-1),n=Object(c["createElementVNode"])("div",null,[Object(c["createTextVNode"])("Запрашиваемый вами ресурс не найден. "),Object(c["createElementVNode"])("br"),Object(c["createTextVNode"])(" Воспользуйтесь главным меню для навигации по сайту ")],-1);function l(e,t,o,l,a,i){return Object(c["renderSlot"])(e.$slots,"default",{},()=>[r,n])}var a={name:"404"},i=o("6b0d"),d=o.n(i);const s=d()(a,[["render",l]]);t["a"]=s},"8aa3":function(e,t,o){"use strict";o.d(t,"a",(function(){return c}));o("14d9");function c(e){var t={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"e","ж":"j","з":"z","и":"i","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"shch","ы":"y","э":"e","ю":"u","я":"ya"," ":"-"},o=[];e=e.trim().replace(/[ъь]+/g,"").replace(/й/g,"i");for(var c=0;c<e.length;++c)o.push(t[e[c]]||void 0==t[e[c].toLowerCase()]&&e[c]||t[e[c].toLowerCase()].toUpperCase());return o.join("")}},c4a9:function(e,t,o){"use strict";(function(e){o.d(t,"a",(function(){return r}));var c=function(){return"undefined"!==typeof window?window:e},r=function(){var e=c();return e&&e.tinymce?e.tinymce:null}}).call(this,o("c8ba"))},ca72:function(e,t,o){"use strict";var c=o("7a23"),r=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],n=function(e){return-1!==r.map((function(e){return e.toLowerCase()})).indexOf(e.toLowerCase())},l=function(e,t,o){Object.keys(t).filter(n).forEach((function(c){var r=t[c];"function"===typeof r&&("onInit"===c?r(e,o):o.on(c.substring(2),(function(e){return r(e,o)})))}))},a=function(e,t,o,r){var n=e.modelEvents?e.modelEvents:null,l=Array.isArray(n)?n.join(" "):n;Object(c["watch"])(r,(function(t,c){o&&"string"===typeof t&&t!==c&&t!==o.getContent({format:e.outputFormat})&&o.setContent(t)})),o.on(l||"change input undo redo",(function(){t.emit("update:modelValue",o.getContent({format:e.outputFormat}))}))},i=function(e,t,o,c,r,n){c.setContent(n()),o.attrs["onUpdate:modelValue"]&&a(t,o,c,r),l(e,o.attrs,c)},d=0,s=function(e){var t=Date.now(),o=Math.floor(1e9*Math.random());return d++,e+"_"+o+d+String(t)},u=function(e){return null!==e&&"textarea"===e.tagName.toLowerCase()},b=function(e){return"undefined"===typeof e||""===e?[]:Array.isArray(e)?e:e.split(" ")},m=function(e,t){return b(e).concat(b(t))},p=function(e){return null===e||void 0===e},O=function(){return{listeners:[],scriptId:s("tiny-script"),scriptLoaded:!1}},j=function(){var e=O(),t=function(e,t,o,c){var r=t.createElement("script");r.referrerPolicy="origin",r.type="application/javascript",r.id=e,r.src=o;var n=function(){r.removeEventListener("load",n),c()};r.addEventListener("load",n),t.head&&t.head.appendChild(r)},o=function(o,c,r){e.scriptLoaded?r():(e.listeners.push(r),o.getElementById(e.scriptId)||t(e.scriptId,o,c,(function(){e.listeners.forEach((function(e){return e()})),e.scriptLoaded=!0})))},c=function(){e=O()};return{load:o,reinitialize:c}},f=j(),v=o("c4a9"),V={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],modelValue:String,disabled:Boolean,tinymceScriptSrc:String,outputFormat:{type:String,validator:function(e){return"html"===e||"text"===e}}},N=function(){return N=Object.assign||function(e){for(var t,o=1,c=arguments.length;o<c;o++)for(var r in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},N.apply(this,arguments)},g=function(e,t,o,c){return e(c||"div",{id:t,ref:o})},E=function(e,t,o){return e("textarea",{id:t,visibility:"hidden",ref:o})},y=Object(c["defineComponent"])({props:V,setup:function(e,t){var o=e.init?N({},e.init):{},r=Object(c["toRefs"])(e),n=r.disabled,l=r.modelValue,a=r.tagName,d=Object(c["ref"])(null),b=null,O=e.id||s("tiny-vue"),j=e.init&&e.init.inline||e.inline,V=!!t.attrs["onUpdate:modelValue"],y=!0,h=e.initialValue?e.initialValue:"",k="",w=function(e){return V?function(){return(null===l||void 0===l?void 0:l.value)?l.value:""}:function(){return e?h:k}},_=function(){var c=w(y),r=N(N({},o),{readonly:e.disabled,selector:"#"+O,plugins:m(o.plugins,e.plugins),toolbar:e.toolbar||o.toolbar,inline:j,setup:function(r){b=r,r.on("init",(function(o){return i(o,e,t,r,l,c)})),"function"===typeof o.setup&&o.setup(r)}});u(d.value)&&(d.value.style.visibility=""),Object(v["a"])().init(r),y=!1};Object(c["watch"])(n,(function(e){var t;null!==b&&("function"===typeof(null===(t=b.mode)||void 0===t?void 0:t.set)?b.mode.set(e?"readonly":"design"):b.setMode(e?"readonly":"design"))})),Object(c["watch"])(a,(function(e){var t;V||(k=b.getContent()),null===(t=Object(v["a"])())||void 0===t||t.remove(b),Object(c["nextTick"])((function(){return _()}))})),Object(c["onMounted"])((function(){if(null!==Object(v["a"])())_();else if(d.value&&d.value.ownerDocument){var t=e.cloudChannel?e.cloudChannel:"5",o=e.apiKey?e.apiKey:"no-api-key",c=p(e.tinymceScriptSrc)?"https://cdn.tiny.cloud/1/"+o+"/tinymce/"+t+"/tinymce.min.js":e.tinymceScriptSrc;f.load(d.value.ownerDocument,c,_)}})),Object(c["onBeforeUnmount"])((function(){null!==Object(v["a"])()&&Object(v["a"])().remove(b)})),j||(Object(c["onActivated"])((function(){y||_()})),Object(c["onDeactivated"])((function(){var e;V||(k=b.getContent()),null===(e=Object(v["a"])())||void 0===e||e.remove(b)})));var C=function(e){var t;k=b.getContent(),null===(t=Object(v["a"])())||void 0===t||t.remove(b),o=N(N({},o),e),Object(c["nextTick"])((function(){return _()}))};return t.expose({rerender:C}),function(){return j?g(c["h"],O,d,e.tagName):E(c["h"],O,d)}}});t["a"]=y}}]);
//# sourceMappingURL=chunk-497abd08.4d03a013.js.map