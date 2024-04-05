
import HomeView from "@/views/HomeView.vue";
import AlertDetail from "@/components/AlertDetail.vue";
import * as api from '@/services/api.service';
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
const lazyLoad = (view) => () => import(`@/views/${view}.vue`)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: "/alert/:id",
      name: "Alert",
      component: AlertDetail,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
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

export default router;
