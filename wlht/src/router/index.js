import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout/layout'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginRegister',
      component:() => import('../components/LoginRegister'),
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path: '/index',
          name: 'index',
          component:() => import('../view/index/index'),
        },
        {
          path: '/appointment',
          name: 'appointment',
          component:() => import('../view/SiteManagement/appointment'),
        }
      ]
    },
  ]
})
