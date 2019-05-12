import Vue from 'vue'
import Vuex from 'vuex'
import * as T from './types'
import actions from './actions'
import { AUTH_TOKEN } from '../constant'

Vue.use(Vuex)

const store = {
  state: {
    identity: {
      accessToken: localStorage.getItem(AUTH_TOKEN) || '',
      expiresIn: +localStorage.getItem(`${AUTH_TOKEN}_exp`) || 1,
      stamp: +localStorage.getItem(`${AUTH_TOKEN}_stamp`) || 0,
      info: {
        id: '',
        name: '',
        email: '',
        profile: {
          id: '',
          wechat: null,
          weibo: null,
          zhihu: null,
          juejin: null
        }
      }
    },
    listening: {
      note: false
    }
  },
  mutations: {
    [T.SIGN_IN](state, payload) {
      const { expiresIn, accessToken } = payload
      const stamp = +new Date()
      state.identity.accessToken = accessToken
      state.identity.expiresIn = expiresIn
      state.identity.stamp = stamp

      localStorage.setItem(AUTH_TOKEN, accessToken)
      localStorage.setItem(`${AUTH_TOKEN}_exp`, expiresIn)
      localStorage.setItem(`${AUTH_TOKEN}_stamp`, stamp)
    },
    [T.SET_PROFILE](state, payload) {
      state.identity.info = payload
    },
    [T.LISTEN](state, [type, bool] = []) {
      if (!type) return
      Vue.set(state.listening, type, bool)
    },
    [T.CLEAR_SIGN](state) {
      state.identity.accessToken = ''
      state.identity.expiresIn = 1
      state.identity.stamp = 0
      localStorage.setItem(AUTH_TOKEN, '')
      localStorage.setItem(`${AUTH_TOKEN}_exp`, 1)
      localStorage.setItem(`${AUTH_TOKEN}_stamp`, 0)
    }
  },
  getters: {
    checkExpired(state) {
      return function() {
        const {
          identity: { expiresIn, stamp }
        } = state
        const snapStamp = +new Date()
        return snapStamp - stamp > expiresIn * 1000
      }
    },
    isLogin(state) {
      return !!state.identity.accessToken
    },
    checkLogin(state, getters) {
      return function() {
        return getters.isLogin && !getters.checkExpired()
      }
    }
  },
  actions
}

export default new Vuex.Store(store)
