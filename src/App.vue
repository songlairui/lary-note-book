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
import SUB_NOTE from "./graphql/sub-note.gql";

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
    const observer = this.$apollo.subscribe({
      query: SUB_NOTE
    });
    observer.subscribe({
      next: console.info,
      error: console.error
    });
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
