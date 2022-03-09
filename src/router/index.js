import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TasksField from "@/views/TasksField";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks-field',
    name: 'TasksField',
    component: TasksField
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
