<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/note-list">NoteList</router-link>
      </div>
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  data() {
    return {
      zh_CN
    };
  },
  components: {
    HelloWorld
  }
};
</script>

<style>
</style>
