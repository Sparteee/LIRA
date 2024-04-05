import * as api from '@/services/api.service';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const lazyLoad = (view) => () => import(`../views/${view}.vue`)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: lazyLoad('LoginView'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: lazyLoad('LogoutView'),
      beforeEnter: (to, from) => {
        if (!api.isAuthenticated()) {
          return '/login'
        }
      }
    },

  ]
})

export default router
