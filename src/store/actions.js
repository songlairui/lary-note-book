import * as T from './types'
import { onLogin, onLogout } from '../plugins/vue-apollo'

import apolloProvider from '../plugins/apollo-client'
import SIGN_IN from '../graphql/signin.gql'
import SUB_NOTE from '../graphql/sub-note.gql'
import MY_NOTES from '../graphql/my-notes.gql'
import SELF_PROFILE from '../graphql/self-profile.gql'
import DELETE_NOTE from '../graphql/delete-note.gql'

import { initVari } from '../constant'

const { defaultClient: $apollo } = apolloProvider

const actions = {
  async deleteNote(state, where) {
    const { data } = await $apollo.mutate({
      mutation: DELETE_NOTE,
      variables: {
        where
      }
    })
    state.commit(T.DELETE_NOTE, data.deleteNote)
    return data.deleteNote
  },
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
      next: ({ data: { note } }) => {
        const { mutation, node, previousValues } = note
        const variables = initVari

        const data = $apollo.readQuery({
          query: MY_NOTES,
          variables
        })
        if (!data || !data.notesConnection) {
          return
        }

        if (mutation === 'CREATED') {
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
        } else if (mutation === 'DELETED') {
          const { id } = previousValues
          const deleteIdx = data.notesConnection.edges.findIndex(
            (edge) => edge.cursor === id
          )
          if (deleteIdx < 0) {
            return
          }
          data.notesConnection.edges = [...data.notesConnection.edges]
          data.notesConnection.edges.splice(deleteIdx, 1)
          // TO DO 暂无更新 pageInfo场景
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
