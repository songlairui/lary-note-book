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
      <float-actions/>
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import FloatActions from "./floating/Actions";

export default {
  name: "app",
  data() {
    return {
      zh_CN
    };
  },
  components: {
    FloatActions
  },
  methods: {
    openModal() {},
    addNote() {}
  }
};
</script>

<style>
.float-actions {
  position: fixed;
  right: 2em;
  bottom: 2em;
}
</style>
