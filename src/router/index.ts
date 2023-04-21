import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Articles from '../views/Articles.vue'
import Auth from '../views/Auth.vue'
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Home,
    meta: {
      auth: false
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      auth: false
    }
  },
  {
    path: '/specials_and_actions',
    name: 'SpecialsAndActions',
    component: Articles,
    meta: {
      tableName: 'specials_and_actions',
      auth: false
    },
    children: [
      {
        path: '',
        component: () => import('../views/article/SpecialList.vue'),
        name: 'SpecialsAndActionsIndex'
      },
      {
        path: 'actions',
        component: () => import('../views/article/ArticleList.vue'),
        name: 'SpecialsAndActionsActions'
      },
      {
        path: 'specials',
        component: () => import('../views/article/ArticleList.vue'),
        name: 'SpecialsAndActionsSpecials'
      },
      {
        path: 'add',
        component: () => import('../views/article/ArticleAdd.vue'),
        name: 'SpecialsAndActionsAdd',
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/tech',
    name: 'Tech',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tech.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/blocks',
    name: 'Blocks',
    component: () => import('../views/Blocks.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/news/',
    name: 'News',
    component: Articles,
    meta: {
      tableName: 'news',
      auth: false
    },
    children: [
      {
        path: '',
        component: () => import('../views/article/ArticleList.vue'),
        name: 'article-index'
      },
      {
        path: ':id',
        component: () => import('../views/article/Article.vue'),
        name: 'article-index-id'
      },
      {
        path: 'add',
        component: () => import('../views/article/ArticleAdd.vue'),
        name: 'article-add',
        meta: {
          auth: true
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/article/ArticleEdit.vue'),
        name: 'article-edit',
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: () => import('../views/Alerts.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog.vue'),
    meta: {
      auth: false
    },
    children: [
      {
        path: 'themed_products',
        name: 'Catalog-themed',
        component: () => import('../views/Contacts.vue')
      },
      {
        path: 'others',
        name: 'Catalog-others',
        component: () => import('../views/Contacts.vue')
      }
    ]
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('../views/Contacts.vue'),
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
      auth: false
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/cart-address',
    name: 'CartAddress',
    component: () => import('../views/CartAddress.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/cart-dostavka',
    name: 'Cart-Dostavka',
    component: () => import('../views/CartDostavka.vue'),
    meta: {
      auth: false
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

  console.log(`Для этой страницы нужна авторизация=${needAuth} \nАвторизация пройдена=${isAuth}`)

  if (needAuth) {
    isAuth ? next() : next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
