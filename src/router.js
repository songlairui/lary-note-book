import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'About'
    },
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
      hide() {
        return this.isLogin
      }
    },
    component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
  },
  {
    path: '/note-list',
    name: 'noteList',
    meta: {
      title: 'NoteList',
      hide() {
        return !this.isLogin
      },
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "note-list" */ './views/NoteList.vue')
  }
]

const routeMeta = routes.map((item) => {
  const { ...meta } = item
  delete meta.component
  return meta
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export { routeMeta }
