import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../page/home/Home.vue'
import BlogContent from '../components/blogConent/BlogContent.vue'
import User from '../page/user/User.vue'
import Login from '../page/user/login/Login.vue'
import Registe from '../page/user/registe/Registe.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/article/tree' },
  {
    path: '/article',
    component: Home,
    children: [
      {
        path: '/article/:id',
        component: BlogContent,
        beforeEnter (to, from, next) {
          const lv = store.state.userInfo.power
          if (to.params.id === 'add') {
            if (!lv || lv <= 1) next('/article/tree')
          }
          next()
        }
      }
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
