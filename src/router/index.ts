import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import GymClassesPage from '@/pages/GymClassesPage.vue'
import Members from '@/pages/Members.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/classes',
      name: 'GymClasses',
      component: GymClassesPage,
    },
    {
      path: '/members',
      name: 'Members',
      component: Members,
    },
  ],
})

export default router
