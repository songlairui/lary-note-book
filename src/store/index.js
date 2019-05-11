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
      expiresIn: localStorage.getItem(`${AUTH_TOKEN}_exp`) || 0,
      stamp: localStorage.getItem(`${AUTH_TOKEN}_stamp`) || 0
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
    }
  },
  getters: {
    checkExpired(state, ...oo) {
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
