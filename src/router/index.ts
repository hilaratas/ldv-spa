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
      auth: false,
      headerText: 'Welcome!'
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: {
      ...DEFAULT_META,
      auth: false,
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
      auth: false,
      headerText: 'Вход'
    }
  },
  {
    path: '/singup',
    name: 'SingUp',
    component: () => import('../views/SingUp.vue'),
    meta: {
      ...DEFAULT_META,
      auth: false,
      headerText: 'Регистрация'
    }
  },
  {
    path: '/about/',
    name: 'About',
    component: Articles,
    meta: {
      ...DEFAULT_META,
      auth: false,
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
          headerText: 'Добавить статью о нас'
        }
      },
      {
        path: ':id',
        component: () => import('../views/article/Article.vue'),
        name: 'AboutIndexId',
        meta: {
          auth: false,
          headerType: 'dynamic'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/article/ArticleEdit.vue'),
        name: 'AboutEdit',
        meta: {
          ...DEFAULT_META,
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
      auth: false,
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
          headerText: 'Добавить новость'
        }
      },
      {
        path: ':id',
        component: () => import('../views/article/Article.vue'),
        name: 'article-index-id',
        meta: {
          auth: false,
          headerType: 'dynamic'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/article/ArticleEdit.vue'),
        name: 'article-edit',
        meta: {
          ...DEFAULT_META,
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
      auth: false,
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
      auth: false,
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
      auth: false,
      headerText: 'Каталог'
    },
    children: [
      {
        path: '',
        component: () => import('../views/product/ProductsAll.vue'),
        name: 'ProductsAll',
        meta: {
          headerText: 'Каталог'
        }
      },
      {
        path: 'add',
        component: () => import('../views/catalog/CatalogSectionAdd.vue'),
        name: 'CatalogSectionAdd',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Добавить раздел каталога'
        }
      },
      {
        path: 'edit/:hru',
        component: () => import('../views/catalog/CatalogSectionEdit.vue'),
        name: 'CatalogEdit',
        meta: {
          ...DEFAULT_META,
          auth: true,
          headerText: 'Редактировать раздел каталога'
        }
      },
      {
        path: ':hru/',
        component: () => import('../views/ProductOrSection.vue'),
        name: 'Products',
        meta: {
          auth: false,
          headerType: 'dynamic'
        }
      },
      // {
      //   path: ':productHru',
      //   component: () => import('../views/product/Product.vue'),
      //   name: 'Product',
      //   meta: {
      //     auth: false,
      //     headerType: 'dynamic'
      //   },
      // },
      {
        path: 'product/add',
        component: () => import('../views/product/ProductAdd.vue'),
        name: 'ProductAdd',
        meta: {
          auth: true,
          headerText: 'Добавить изделие'
        }
      },
      {
        path: 'product/edit/:prodHru',
        component: () => import('../views/product/ProductEdit.vue'),
        name: 'ProductEdit',
        meta: {
          auth: true,
          headerText: 'Редактировать изделие'
        },
      },

    ]
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('../views/Contacts.vue'),
    meta: {
      ...DEFAULT_META,
      auth: false,
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
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      ...DEFAULT_META,
      auth: false,
      headerText: 'Корзина'
    }
  },
  {
    path: '/cart-address',
    name: 'CartAddress',
    component: () => import('../views/CartAddress.vue'),
    meta: {
      ...DEFAULT_META,
      auth: false,
      headerText: 'Карзина'
    }
  },
  {
    path: '/cart-dostavka',
    name: 'CartDostavka',
    component: () => import('../views/CartDostavka.vue'),
    meta: {
      ...DEFAULT_META,
      auth: false,
      headerText: 'Корзина'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      ...DEFAULT_META,
      headerText: 'Профиль'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404.vue'),
    meta: {
      ...DEFAULT_META,
      auth: false,
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
