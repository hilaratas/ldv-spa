import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewsBase from '../views/news/Base'
import NewsIndex from '../views/news/Index'
import NewsAdd from '../views/news/Add'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/news',
    name: 'News',
    component: NewsBase,
    children: [
      {
        path: '',
        component: NewsIndex,
        name: 'news-index'
      },
      {
        path: 'add',
        component: NewsAdd,
        name: 'news-add'
      }
    ]
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: () => import('../views/Alerts.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('../views/Contacts.vue')
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog.vue')
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
    name: 'CartDostavka',
    component: () => import('../views/CartDostavka.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
