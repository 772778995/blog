import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../page/home/Home.vue'
import BlogContent from '../components/blogConent/BlogContent.vue'
import User from '../page/user/User.vue'
import Login from '../page/user/login/Login.vue'
import Registe from '../page/user/registe/Registe.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/article/add' },
  {
    path: '/article',
    component: Home,
    children: [
      { path: '/article/:id', component: BlogContent }
    ]
  },
  {
    path: '/user',
    redirect: '/user/login',
    component: User,
    children: [
      { path: '/user/login', component: Login },
      { path: '/user/registe', component: Registe }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
