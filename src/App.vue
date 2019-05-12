<template>
  <div id="app">
    <nav-head></nav-head>
    <router-view></router-view>
    <float-actions/>
  </div>
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
    const note$ = this.subscribeNote();
    console.info(note$, "note$");
  }
};
</script>

<style lang='less'>
html,
body,
#app {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.float-actions {
  position: fixed;
  right: 2em;
  bottom: 2em;
}
</style>
