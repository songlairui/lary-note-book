import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['checkExpired', 'isLogin'])
  },
  methods: {
    ...mapActions(['subscribeNote'])
  }
}
