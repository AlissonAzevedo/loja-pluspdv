import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/produto/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/ProductView.vue')
  },
  {
    path: '/unidade',
    name: 'unit',
    component: () => import(/* webpackChunkName: "unit" */ '../views/SelectUnitView.vue')
  },
  {
    path: '/carrinho',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/CartView.vue')
  },
  {
    path: '/conta',
    name: 'account',
    component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
