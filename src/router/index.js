import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import admin from '@/layout/admin.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
       meta: {
        layout: admin
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailView.vue'),
     
    },
    {
      path: '/question/create',
      name: 'createQuestion',
       meta: {
        layout: admin
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/createQuestion.vue'),
     
    }
  ]
})

export default router
