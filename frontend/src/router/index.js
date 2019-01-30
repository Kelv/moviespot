import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/Home'
import Login from '../components/login/Login'
import Rental from '../components/rental/Rental'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: "/rental",
          component: Rental
        }
      ]
    }
  ]
})
