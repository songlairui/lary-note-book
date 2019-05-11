<template>
  <div class="login">
    <form v-on:submit.prevent="formValid && mutate()">
      <label for="field-email">Email</label>
      <input id="field-email" v-model="email" placeholder="Type Email" class="input">
      <label for="field-password">Password</label>
      <input
        id="field-password"
        v-model="pwd"
        placeholder="Type Password"
        class="input"
        type="password"
      >
      <input type="submit" value="Login">
    </form>
    <hr>
    <div class="flex">
      <div class="a">0</div>
      <div class="b">{{ progress }} %</div>
      <div class="c" @click="check">{{ identity.expiresIn }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      pwd: "",
      expired: false
    };
  },
  computed: {
    ...mapState(["identity"]),
    ...mapGetters(["checkExpired"]),
    formValid() {
      return this.email && this.pwd;
    },
    progress() {
      const { expiresIn, stamp } = this.identity;
      const snapStamp = +new Date();
      return (
        Math.round(Math.min(snapStamp - stamp, expiresIn * 1000) / expiresIn) /
        10
      );
    }
  },
  methods: {
    ...mapActions(["signIn"]),
    check() {
      this.expired = this.checkExpired();
    },
    async mutate() {
      try {
        const data = await this.signIn({ email: this.email, pwd: this.pwd });
      } catch (error) {
        this.handleLoginFail(error);
      }
    },
    handleLoginFail(errObj) {
      this.$message.error(errObj.gqlError.message.error);
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  text-align: center;
  .flex {
    width: 320px;
    > div {
      flex: 1;
    }
  }
}
</style>

