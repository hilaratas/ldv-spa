import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Articles from '../views/Base.vue'
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
    component: Main,
    meta: {
      ...DEFAULT_META,
      headerText: 'Главная',
      layout: 'main'
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
    path: '/about/',
    name: 'About',
    component: Articles,
    meta: {
      ...DEFAULT_META,
      headerText: 'О нас',
      tableName: 'about'
    },
    children: [
      {
        path: '',
        component: () => import('../views/article/ArticleList.vue'),
        name: 'AboutIndex'
      },
      {
        path: 'add',
        component: () => import('../views/article/ArticleAdd.vue'),
        name: 'AboutAdd',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Добавить статью о нас'
        }
      },
      {
        path: ':id',
        component: () => import('../views/article/Article.vue'),
        name: 'AboutIndexId',
        meta: {
          headerType: 'dynamic'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/article/ArticleEdit.vue'),
        name: 'AboutEdit',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Редактировать статью о нас'
        }
      }
    ]
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
        component: () => import('../views/article/ArticleList.vue'),
        name: 'specials-and-actions-index'
      },
      {
        path: 'add',
        component: () => import('../views/article/ArticleAdd.vue'),
        name: 'specials-and-actions-add',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Добавить акцию или спецпредложение'
        },
      },
      {
        path: ':id',
        component: () => import('../views/article/Article.vue'),
        name: 'specials-and-actions-index-id',
        meta: {
          headerType: 'dynamic'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/article/ArticleEdit.vue'),
        name: 'specials-and-actions-edit',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Редактировать акцию или спецпредложение'
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
    component: () => import('../views/Base.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Каталог'
    },
    children: [
      {
        path: '',
        component: () => import('../views/Catalog.vue'),
        name: 'CatalogIndex'
      },
      {
        path: 'add',
        component: () => import('../views/catalog/CatalogSectionAdd.vue'),
        name: 'CatalogSectionAdd',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Добавить новый раздел каталога'
        }
      },
      {
        path: ':id',
        component: () => import('../views/article/Article.vue'),
        name: 'AboutIndexId',
        meta: {
          headerType: 'dynamic'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/article/ArticleEdit.vue'),
        name: 'AboutEdit',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Редактировать статью о нас'
        }
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
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      ...DEFAULT_META,
      auth: true,
      headerText: 'Профиль'
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
