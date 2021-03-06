import Vue from 'vue'
import Vuex from 'vuex'
import * as T from './types'
import actions from './actions'
import { AUTH_TOKEN } from '../constant'

Vue.use(Vuex)

const infoStr = localStorage.getItem(`${AUTH_TOKEN}_info`)
const blankInfo = {
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

const store = {
  state: {
    identity: {
      accessToken: localStorage.getItem(AUTH_TOKEN) || '',
      expiresIn: +localStorage.getItem(`${AUTH_TOKEN}_exp`) || 1,
      stamp: +localStorage.getItem(`${AUTH_TOKEN}_stamp`) || 0,
      info: infoStr ? JSON.parse(infoStr) : blankInfo
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
      localStorage.setItem(`${AUTH_TOKEN}_info`, JSON.stringify(payload))
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
      state.identity.info = blankInfo
      localStorage.setItem(AUTH_TOKEN, '')
      localStorage.setItem(`${AUTH_TOKEN}_exp`, 1)
      localStorage.setItem(`${AUTH_TOKEN}_stamp`, 0)
      localStorage.setItem(`${AUTH_TOKEN}_info`, '')
    },
    [T.DELETE_NOTE](state, payload) {
      console.info('deleted', payload)
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
