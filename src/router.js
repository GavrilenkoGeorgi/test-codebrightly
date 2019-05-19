import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/allComments',
      name: 'allComments',
      // route level code-splitting
      // this generates a separate chunk (allComments.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "AllComments" */ './views/AllComments.vue')
    },
    {
      path: '/singleComment/:id',
      name: 'singleComment',
      // route level code-splitting
      // this generates a separate chunk (singleComment.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "SingleComment" */ './views/SingleComment.vue')
    }
  ]
})
