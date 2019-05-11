<template>
  <div class="home">
    <img @click="$router.push({name:'noteList'})" class="entry" src="@/assets/dribble_book_4x.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>
<style lang="less" scoped>
.home {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.entry {
  max-width: 50vh;
  cursor: pointer;
  border-radius: 3em;
}
</style>

