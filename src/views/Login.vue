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
      <div class="c" @click="checkExpired">{{ identity.expiresIn }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      pwd: ""
    };
  },
  computed: {
    ...mapState(["identity"]),
    formValid() {
      return this.email && this.pwd;
    },
    progress() {
      const { expiresIn, stamp } = this.identity;
      const snapStamp = +new Date();
      if (!expiresIn) return "-";
      return (
        Math.round(Math.min(snapStamp - stamp, expiresIn * 1000) / expiresIn) /
        10
      );
    }
  },
  methods: {
    ...mapActions(["signIn", "clearSign"]),
    async mutate() {
      try {
        const data = await this.signIn({ email: this.email, pwd: this.pwd });
      } catch (error) {
        this.handleLoginFail(error);
      }
    },
    handleLoginFail(errObj) {
      if (!errObj.graphQLErrors) {
        this.$message.error(`${errObj}`);
        return;
      }
      const statusCode = errObj.graphQLErrors[0].message.statusCode;
      if (statusCode === 403) {
        this.clearSign();
      }
      this.$message.error(
        errObj.graphQLErrors.map(err => err.message.error).join()
      );
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

