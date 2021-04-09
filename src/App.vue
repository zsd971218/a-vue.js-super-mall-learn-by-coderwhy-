<template>
  <div id="app">
    <keep-alive exclude="Details">
      <router-view />
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
//底部选项栏
import MainTabBar from "./components/content/MainTabBar.vue";
export default {
  components: { MainTabBar },
  name: "app",
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>
