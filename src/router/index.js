import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from '@/firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products/:id',
    name: 'ShowProduct',
    component: () => import('../views/ShowProduct.vue')
  },
  {
    path: '/categories/:id',
    name: 'ShowCategory',
    component: () => import('../views/ShowCategory.vue')
  },
  {
    path: '/product/create',
    name: 'CreateProduct',
    component: () => import('../views/CreateProduct.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if(requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
