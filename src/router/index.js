import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login'
import Layout from '@/views/layout/layout'
import Home from '@/views/home/home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'app-article',
        component: () => import('@/views/article/app-article')
      },
      {
        path: 'image',
        name: 'appImage',
        component: () => import('@/views/appImage/appImage')
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/comment/comment')
      },
      {
        path: '/fans',
        name: 'fans',
        component: () => import('@/views/fans/fans')
      },
      {
        path: '/publish',
        name: 'publish',
        component: () => import('@/views/publish/publish')
      },
      {
        path: '/setting',
        name: '/setting',
        component: () => import('@/views/setting/setting')
      },
      {
        path: '/editArticle',
        name: '/editArticle',
        component: () => import('@/views/editArticle/editArticle')
      }

    ]
  },
  {
    path: '/xieyi',
    name: 'xieyi',
    component: () => import('@/views/xieyi/xieyi')
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
