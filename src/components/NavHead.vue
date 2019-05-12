<template>
  <nav class="nav-head">
    <template v-for="nav of navs">
      <router-link
        :to="nav"
        :class="{active: nav.name === $route.name}"
        v-if="!nav.meta.hide"
      >{{ nav.meta.title }}</router-link>
    </template>
    <template v-if="isLogin">
      {{ accountInfo.name }}
      <a-divider type="vertical"></a-divider>
      <a-icon type="logout" @click="logout"/>
    </template>
    <template v-else></template>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { routeMeta } from "../router";

function execute(payload) {
  if (typeof payload === "function") {
    return payload.call(this);
  }
  return !!payload;
}

export default {
  name: "NavHead",

  computed: {
    ...mapState({
      accountInfo: state => state.identity.info
    }),

    navs() {
      return routeMeta.map(nav => ({
        ...nav,
        meta: {
          ...nav.meta,
          hide: execute.call(this, nav.meta.hide)
        }
      }));
    }
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
    &.active,
    &:hover {
      background: lightcyan;
      color: darkcyan;
    }
  }
}
</style>


