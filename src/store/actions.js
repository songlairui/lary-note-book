import * as T from './types'
import apolloProvider from '../plugins/apollo-client'
import SIGN_IN from '../graphql/signin.gql'
import SUB_NOTE from '../graphql/sub-note.gql'

const { defaultClient: $apollo } = apolloProvider

const actions = {
  async signIn({ commit }, { email, pwd }) {
    const { data } = await $apollo.mutate({
      mutation: SIGN_IN,
      variables: {
        signinInput: {
          email,
          pwd
        }
      }
    })
    commit(T.SIGN_IN, data.signin)
  },
  subscribeNote() {
    const observer = this.$apollo.subscribe({
      query: SUB_NOTE
    })
    observer.subscribe({
      next: console.info,
      error: console.error
    })
    return observer
  }
}

export default actions
