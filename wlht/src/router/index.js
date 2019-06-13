import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout/layout'
Vue.use(Router)

const router = new Router({
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
          path: '/classDetail',
          name: 'classDetail',
          component:() => import('../view/classManage/classDetail'),
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
          path: '/changeChang',
          name: 'changeChang',
          component:() => import('../view/ChangManage/changeChang'),
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
          path: '/AddPullRe',
          name: 'AddPullRe',
          component:() => import('../view/pullRe/AddPullRe'),
        },

        {
          path: '/orderManage',
          name: 'orderManage',
          component:() => import('../view/orderManage/orderManage'),
        },
        {
          path: '/AddOrder',
          name: 'AddOrder',
          component:() => import('../view/orderManage/AddOrder'),
        },
        {
          path: '/Bookingdetails',
          name: 'Bookingdetails',
          component:() => import('../view/orderManage/Bookingdetails'),

        },
        {
          path: '/shoppManage',
          name: 'shoppManage',
          component:() => import('../view/shoppManage/shoppManage'),
        },
        {
          path: '/AddShopp',
          name: 'AddShopp',
          component:() => import('../view/shoppManage/AddShopp'),
        },

      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/') {
    next();
  }else{
    let token = sessionStorage.getItem('jp_token');
    if (token === null || token === '') {
      next({name: "LoginRegister"});
      return false;
    } else {
      next()
    }
  }

});

export default router;
