<template>
  <nav class="nav-head">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/note-list">NoteList</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavHead"
};
</script>
<style lang="less" scoped>
nav.nav-head {
  text-align: center;
  padding-top: 0.5em;
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


