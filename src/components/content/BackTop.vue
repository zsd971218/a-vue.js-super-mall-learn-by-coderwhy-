<template>
  <div class="back-top">
    <img
      src="~assets/img/common/top.png"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style scoped>
.back-top {
  position: fixed;
  width: 40px;
  height: 40px;
  right: 10px;
  bottom: 50px;
  border-radius: 20px;
  z-index: 5;
}
.back-top img {
  width: 100%;
}
</style>
