<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <nav-head></nav-head>
      <router-view></router-view>
      <float-actions/>
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import FloatActions from "./floating/Actions";
import NavHead from "./components/NavHead";

export default {
  name: "app",
  data() {
    return {
      zh_CN
    };
  },
  components: {
    NavHead,
    FloatActions
  },
  methods: {
    openModal() {},
    addNote() {}
  },
  mounted() {
    if (!this.checkExpired()) {
      const note$ = this.subscribeNote();
      console.info(note$, "note$");
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
#app {
  display: flex;
  flex-direction: column;
}
.float-actions {
  position: fixed;
  right: 2em;
  bottom: 2em;
}
</style>
