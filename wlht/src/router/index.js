import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout/layout'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path: '/index',
          name: 'index',
          component:() => import('../view/index/index'),
        },
        {
          path: '/memberManagement',
          name: 'memberManagement',
          component:() => import('../view/Member/memberManagement')
        }
      ]
    },
  ]
})
