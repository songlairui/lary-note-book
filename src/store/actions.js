import * as T from './types'
import { onLogin, onLogout } from '../plugins/vue-apollo'

import apolloProvider from '../plugins/apollo-client'
import SIGN_IN from '../graphql/signin.gql'
import SUB_NOTE from '../graphql/sub-note.gql'
import MY_NOTES from '../graphql/my-notes.gql'
import SELF_PROFILE from '../graphql/self-profile.gql'

import { initVari } from '../constant'

const { defaultClient: $apollo } = apolloProvider

const actions = {
  async signIn({ commit, dispatch }, { email, pwd }) {
    const {
      data: { signin }
    } = await $apollo.mutate({
      mutation: SIGN_IN,
      variables: {
        signinInput: {
          email,
          pwd
        }
      }
    })
    commit(T.SIGN_IN, signin)
    await onLogin($apollo, signin.accessToken)
    const {
      data: { selfProfile }
    } = await $apollo.query({
      query: SELF_PROFILE
    })
    commit(T.SET_PROFILE, selfProfile)
    dispatch('subscribeNote')
  },
  async signOff({ commit }) {
    await onLogout($apollo)
    commit(T.CLEAR_SIGN)
  },
  subscribeNote({ commit, getters }) {
    if (!getters.checkLogin()) {
      console.warn('Do not subscribe without log in')
      return
    }
    const observer = $apollo.subscribe({
      query: SUB_NOTE
    })
    commit(T.LISTEN, ['note', true])
    observer.subscribe({
      next: ({ data }) => {
        const { mutation, node } = data.note
        if (mutation === 'CREATED') {
          const variables = initVari
          const data = $apollo.readQuery({
            query: MY_NOTES,
            variables
          })
          if (!data || !data.notesConnection) {
            return
          }
          data.notesConnection.edges.unshift({
            cursor: node.id,
            node: node,
            __typename: `${node.__typename}Edge`
          })
          data.notesStatistics.aggregate.count += 1
          $apollo.writeQuery({
            query: MY_NOTES,
            variables,
            data
          })
        }
      },
      error: console.error
    })
    return observer
  },
  clearSign({ commit }) {
    commit(T.CLEAR_SIGN)
  }
}

export default actions
