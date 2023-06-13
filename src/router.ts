import { createRouter, createWebHistory } from 'vue-router'
import MainView from './views/MainView.vue'
import DictView from './views/DictView.vue'

const routes = [
  { path: '/', name: 'Main', component: MainView },
  { path: '/dict', name: 'Dict', component: DictView }
]

function findBaseURL (entryPath: string) {
  return entryPath.substring(0, entryPath.lastIndexOf('/'))
}

const router = createRouter({
  history: createWebHistory(findBaseURL(window.location.pathname)),
  routes
})

export { router }
