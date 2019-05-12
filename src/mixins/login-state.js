import { mapGetters, mapActions } from 'vuex'
import * as T from '../store/types'

export default {
  computed: {
    ...mapGetters(['checkExpired', 'isLogin', 'checkLogin'])
  },
  methods: {
    ...mapActions(['subscribeNote', 'signOff']),
    logout() {
      this.signOff()
      if (this.$route.meta.requiresAuth) {
        const currentRoute = this.$route.name
        this.$router.push({
          name: 'login',
          query: {
            r: currentRoute
          }
        })
      }
    }
  }
}
