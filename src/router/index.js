import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewsBase from '../views/news/Base'
import NewsIndex from '../views/news/Index'
import NewsOne from '../views/news/One'
import NewsAdd from '../views/news/Add'
import NewsEdit from '../views/news/Edit'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: Home
  },
  {
    path: '/specials_and_actions',
    name: 'SpecialsAndActions',
    component: NewsBase,
    children: [
      {
        path: '',
        component: NewsIndex,
        name: 'SpecialsAndActionsIndex'
      },
      {
        path: 'actions',
        component: NewsIndex,
        name: 'SpecialsAndActionsActions'
      },
      {
        path: 'specials',
        component: NewsIndex,
        name: 'SpecialsAndActionsSpecials'
      },
      {
        path: 'add',
        component: NewsAdd,
        name: 'SpecialsAndActionsAdd'
      }
    ]
  },
  {
    path: '/tech',
    name: 'Tech',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tech.vue')
  },
  {
    path: '/blocks',
    name: 'Blocks',
    component: () => import('../views/Blocks.vue')
  },
  {
    path: '/news/',
    name: 'News',
    component: NewsBase,
    children: [
      {
        path: '',
        component: NewsIndex,
        name: 'news-index'
      },
      {
        path: ':id',
        component: NewsOne,
        name: 'news-index-id'
      },
      {
        path: 'add',
        component: NewsAdd,
        name: 'news-add'
      },
      {
        path: 'edit/:id',
        component: NewsEdit,
        name: 'news-edit'
      }
    ]
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: () => import('../views/Alerts.vue')
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog.vue'),
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
    component: () => import('../views/Product.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/cart-address',
    name: 'CartAddress',
    component: () => import('../views/CartAddress.vue')
  },
  {
    path: '/cart-dostavka',
    name: 'Cart-Dostavka',
    component: () => import('../views/CartDostavka.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
