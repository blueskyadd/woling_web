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
          path: '/memberManagement',
          name: 'memberManagement',
          component:() => import('../view/Member/memberManagement')
        },
        {
          path: '/memberDetail',
          name: 'memberDetail',
          component:() => import('../view/Member/memberDetail'),
        },
        {
          path: '/appointment',
          name: 'appointment',
          component:() => import('../view/SiteManagement/appointment'),
        },
        {
          path: '/NoMember',
          name: 'NoMember',
          component:() => import('../view/NoMember/NoMember'),
        },
        {
          path: '/classManage',
          name: 'classManage',
          component:() => import('../view/classManage/classManage'),
        },
        {
          path: '/GameManage',
          name: 'GameManage',
          component:() => import('../view/GameManage/GameManage'),
        },
        {
          path: '/ChangManage',
          name: 'ChangManage',
          component:() => import('../view/ChangManage/ChangManage'),
        },
        {
          path: '/PerManage',
          name: 'PerManage',
          component:() => import('../view/PerManage/PerManage'),
        },
        {
          path: '/pullRe',
          name: 'pullRe',
          component:() => import('../view/pullRe/pullRe'),
        },
        {
          path: '/orderManage',
          name: 'orderManage',
          component:() => import('../view/orderManage/orderManage'),
        },
        {
          path: '/shoppManage',
          name: 'shoppManage',
          component:() => import('../view/shoppManage/shoppManage'),
        },

      ]
    },
  ]
})
