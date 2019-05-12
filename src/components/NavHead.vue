<template>
  <nav class="nav-head">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <template v-if="isLogin">
      <router-link to="/note-list">NoteList</router-link>
      {{ accountInfo.name }}
      <a-divider type="vertical"></a-divider>
      <a-icon type="logout" @click="logout"/>
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link>
    </template>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavHead",
  computed: {
    ...mapState({
      accountInfo: state => state.identity.info
    })
  }
};
</script>
<style lang="less" scoped>
nav.nav-head {
  background: rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 0.5em;
  > a {
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0 2px;
    transition: all 0.2s;
    border-radius: 4px;
    &:hover {
      background: lightcyan;
      color: darkcyan;
    }
  }
}
</style>


