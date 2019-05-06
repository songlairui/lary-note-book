<template>
  <div class="login">
    <ApolloMutation
      :mutation="require('../graphql/signin.gql')"
      :variables="{
        signinInput: {
          email: email,
          pwd: pwd
        },
      }"
      class="form"
      @done="handleLogin"
      @error="handleLoginFail"
    >
      <template slot-scope="{ mutate }">
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
      </template>
    </ApolloMutation>
    <hr>
    <div class="flex">
      <div class="a">0</div>
      <div class="b">{{ progress }} %</div>
      <div class="c">{{ expiresIn }}</div>
    </div>
  </div>
</template>

<script>
import { AUTH_TOKEN } from "../constant";

export default {
  data() {
    return {
      email: "",
      pwd: "",
      preset: {
        expiresIn: localStorage.getItem(`${AUTH_TOKEN}_exp`) || 3600,
        stamp: localStorage.getItem(`${AUTH_TOKEN}_stamp`) || 0
      },
      snapStamp: +new Date()
    };
  },
  computed: {
    formValid() {
      return this.email && this.pwd;
    },
    expiresIn: {
      get() {
        return this.preset.expiresIn;
      },
      set(val) {
        localStorage.setItem(`${AUTH_TOKEN}_exp`, val);
        this.preset.expiresIn = val;
      }
    },
    stamp: {
      get() {
        return this.preset.stamp;
      },
      set(val) {
        localStorage.setItem(`${AUTH_TOKEN}_stamp`, val);
        this.preset.stamp = val;
        this.snapStamp = val;
      }
    },
    progress() {
      return (
        Math.round(
          Math.min(this.snapStamp - this.stamp, this.expiresIn * 1000) /
            this.expiresIn
        ) / 10
      );
    }
  },
  methods: {
    handleLogin(loginObj) {
      const {
        data: {
          signin: { expiresIn, accessToken }
        }
      } = loginObj;
      localStorage.setItem(AUTH_TOKEN, accessToken);
      this.expiresIn = expiresIn;
      this.stamp = +new Date();
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

