import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
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
      component: () => import(/* webpackChunkName: "SingleComment" */ './views/SingleComment.vue')
    }
  ]
})
