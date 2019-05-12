import * as T from '../store/types'

export default {
  install(Vue, { router, store } = {}) {
    if (!router || !store) {
      throw new Error('Router Guard need target')
    }
    router.beforeEach((to, from, next) => {
      const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
      if (requiresAuth && !store.getters.checkLogin()) {
        store.commit(T.CLEAR_SIGN)
        next({
          name: 'login'
        })
      } else {
        next()
      }
    })
  }
}
