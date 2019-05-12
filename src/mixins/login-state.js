import { mapGetters, mapActions } from 'vuex'
import * as T from '../store/types'

export default {
  computed: {
    ...mapGetters(['checkExpired', 'isLogin'])
  },
  methods: {
    ...mapActions(['subscribeNote']),
    logout() {
      this.$store.commit(T.CLEAR_SIGN)
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/')
      }
    }
  }
}
