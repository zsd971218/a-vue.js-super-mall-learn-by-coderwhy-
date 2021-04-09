<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "tabBar",
};
</script>
<style scoped>
#tab-bar {
  position: fixed;
  width: 100%;
  bottom: 0px;
  left: 0px;
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.2);
}
</style>