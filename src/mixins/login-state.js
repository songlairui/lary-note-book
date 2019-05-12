import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['checkExpired', 'isLogin', 'checkLogin'])
  },
  methods: {
    ...mapActions(['subscribeNote', 'signOff']),
    async logout() {
      await this.signOff()
      this.$message.destroy()
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
