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
  },
  {
    path: '/conta/entrar',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/conta/cadastro',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import(/* webpackChunkName: "about" */ '../views/CheckoutView.vue')
  },
  // {
  //   path: '/opcoes',
  //   name: 'options',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
