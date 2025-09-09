import { createRouter, createWebHistory } from 'vue-router'

// Layout
import DefaultLayout from '../layouts/DefaultLayout.vue'

// Pages
import Home from '../pages/HomePage.vue'
import Contact from '../pages/ContactPage.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
