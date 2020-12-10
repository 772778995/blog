import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../page/home/Home.vue'
import BlogContent from '../components/blogConent/BlogContent.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/article/add' },
  {
    path: '/article',
    component: Home,
    children: [
      { path: '/article/:id', component: BlogContent }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
