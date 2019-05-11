import * as T from './types'
import apolloProvider from '../plugins/apollo-client'
import SIGN_IN from '../graphql/signin.gql'

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
  }
}

export default actions
