import { createRouter, createWebHistory } from 'vue-router'
import GymClassesPage from '@/pages/GymClassesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GymClasses',
      component: GymClassesPage,
    },
  ],
})

export default router
