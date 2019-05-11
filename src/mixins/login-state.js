import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      expired: false
    }
  },
  computed: {
    ...mapGetters(['checkExpired'])
  },
  methods: {
    checkExpires() {
      this.expired = this.checkExpired()
    }
  }
}
