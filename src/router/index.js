import Vue from 'vue'
import Router from 'vue-router'
// @符号 -> src
import Login from '@/components/login'
import Home from '@/components/home'
import Users from '@/components/users'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      // redirect: {
      //   name: 'login'
      // }
      component:Home,
      children:[
        {
          name: 'users',
          path: '/users',
          component:Users
        }
      ]      
    },
    {
      name: 'login',
      // path是必须赋值的属性
      path: '/login',
      component:Login      
    }
  ]
})
