import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/Categories.vue'
import DetailRecord from '../views/DetailRecord.vue'
import History from '../views/History.vue'
import Login from '../views/Login.vue'
import Planning from '../views/Planning.vue'
import Profile from '../views/Profile.vue'
import Record from '../views/Record.vue'
import Register from '../views/Register.vue'
import firebase from 'firebase/app'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      auth:true,
      layout:'layout'
    }
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      layout:'empty'
    },
    component: () => import('./views/Login.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta:{
      layout:'main',
      auth:true,
    },
    component: () => import('./views/Categories.vue')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta:{
      auth:true,
      layout:'empty'
    },
    component: () => import('./views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta:{
      layout:'empty',
      auth:true,
    },
    component: () => import('./views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta:{
      auth:true,
      layout:'empty'
    },
    component: () => import('./views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta:{
      auth:true,
      layout:'empty'
    },
    component: () => import('./views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta:{
      layout:'empty',
      auth:true,
    },
    component: () => import('./views/Record.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta:{
      layout:'main'
    },
    component: () => import('./views/Register.vue')
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next) => {
  const currentUser=firebase.auth().currentUser
  const requireAuth=to.matched.some(record => record.meta.auth)
})
if(requireAuth && !currentUser){
  next('/login?message=login')
}else{
  next()
}
export default router
