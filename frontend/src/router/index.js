import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/Home'
import Login from '../components/login/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Home
    },
    {
      path: '/',
      name: 'home',
      component: Login
    }
  ]
})
