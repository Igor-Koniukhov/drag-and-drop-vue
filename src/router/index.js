import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BoardsField from "@/views/BoardsField";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/boards-field',
    name: 'BoardsField',
    component: BoardsField
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
