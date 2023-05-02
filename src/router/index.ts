import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Articles from '../views/Articles.vue'
import store from "@/store";
import {DEFAULT_META} from '@/config/default-meta'
import {replaceHeader} from "@/utils/replaceHeader";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      ...DEFAULT_META,
      headerText: 'Welcome!'
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Home,
    meta: {
      ...DEFAULT_META,
      headerText: 'Главная'
    }
  },
  {
    path: '/singin',
    name: 'SingIn',
    component: () => import('../views/SingIn.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Вход'
    }
  },
  {
    path: '/singup',
    name: 'SingUp',
    component: () => import('../views/SingUp.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Регистрация'
    }
  },
  {
    path: '/specials_and_actions',
    name: 'SpecialsAndActions',
    component: Articles,
    meta: {
      ...DEFAULT_META,
      headerText: 'Акции и спецпредложения',
      tableName: 'specials_and_actions'
    },
    children: [
      {
        path: '',
        component: () => import('../views/article/SpecialList.vue'),
        name: 'SpecialsAndActionsIndex'
      },
      {
        path: 'actions',
        component: () => import('../views/article/SpecialList.vue'),
        name: 'SpecialsAndActionsActions',
        meta: {
          headerText: 'Акции'
        }
      },
      {
        path: 'specials',
        component: () => import('../views/article/SpecialList.vue'),
        name: 'SpecialsAndActionsSpecials',
        meta: {
          headerText: 'Спецпредложения'
        }
      },
      {
        path: 'add',
        component: () => import('../views/article/ArticleAdd.vue'),
        name: 'SpecialsAndActionsAdd',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Добавить акцию или спецпредложение'
        }
      }
    ]
  },
  {
    path: '/tech',
    name: 'Tech',
    component: () => import('../views/Tech.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Технический дизайн'
    }
  },
  {
    path: '/blocks',
    name: 'Blocks',
    component: () => import('../views/Blocks.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Блоки'
    }
  },
  {
    path: '/news/',
    name: 'News',
    component: Articles,
    meta: {
      ...DEFAULT_META,
      headerText: 'Новости',
      tableName: 'news'
    },
    children: [
      {
        path: '',
        component: () => import('../views/article/ArticleList.vue'),
        name: 'article-index'
      },
      {
        path: 'add',
        component: () => import('../views/article/ArticleAdd.vue'),
        name: 'article-add',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Добавить новость'
        }
      },
      {
        path: ':id',
        component: () => import('../views/article/Article.vue'),
        name: 'article-index-id',
        meta: {
          headerType: 'dynamic'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/article/ArticleEdit.vue'),
        name: 'article-edit',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Редактировать новость'
        }
      }
    ]
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: () => import('../views/Alerts.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Алерты'
    }
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Каталог'
    },
    children: [
      {
        path: 'themed_products',
        name: 'CatalogThemed',
        component: () => import('../views/Catalog.vue'),
        meta: {
          headerText: 'Тематический каталог'
        }
      },
      {
        path: 'others',
        name: 'CatalogOthers',
        component: () => import('../views/Catalog.vue')
      }
    ]
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('../views/Contacts.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Контакты'
    },
    children: [
      {
        path: 'where to watch',
        name: 'Contacts-where-to-watch',
        component: () => import('../views/Contacts.vue'),
      },
      {
        path: 'one_else',
        name: 'Contacts-one-else',
        component: () => import('../views/Contacts.vue'),
      }
    ]
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    meta: {
      ...DEFAULT_META,
      headerType: 'dynamic',
      headerText: 'Флорариумы'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Корзина'
    }
  },
  {
    path: '/cart-address',
    name: 'CartAddress',
    component: () => import('../views/CartAddress.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Карзина'
    }
  },
  {
    path: '/cart-dostavka',
    name: 'CartDostavka',
    component: () => import('../views/CartDostavka.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Корзина'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Страница не найдена'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const needAuth = to.meta.auth
  const isAuth = store.getters['auth/isAuth']

  if (process.env.NODE_ENV == 'development') {
    console.log(`Для этой страницы нужна авторизация=${needAuth} \nАвторизация пройдена=${isAuth}`)
  }

  if (needAuth) {
    isAuth ? next() : next('/singin?message=auth')
  } else {
    next()
  }
})

router.afterEach( replaceHeader )

export default router
