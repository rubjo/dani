import { createRouter, createWebHistory } from 'vue-router'

import StartView from '../views/StartView.vue'
import InstallView from '../views/InstallView.vue'
import OptionsView from '../views/OptionsView.vue'
import MethodsView from '../views/MethodsView.vue'
import ExamplesView from '../views/ExamplesView.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartView,
  },
  {
    path: '/install',
    name: 'install',
    component: InstallView,
  },
  {
    path: '/options',
    name: 'options',
    component: OptionsView,
  },
  {
    path: '/methods',
    name: 'methods',
    component: MethodsView,
  },
  {
    path: '/examples',
    name: 'examples',
    component: ExamplesView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
