import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../page/home/Home.vue'
import Article from '../components/Article.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/article/add' },
  {
    path: '/article',
    component: Home,
    children: [
      { path: '/article/:id', component: Article }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
