<template>
  <div class="feature">
    <a
      href=""
      @click.prevent=""
    ><img
        src="~assets/img/home/recommend_bg.jpg"
        alt="图片没找到"
        @load="finshLoad"
      /></a>
  </div>
</template>

<script>
export default {
  name: "Feature",
  methods: {
    finshLoad() {
      this.$emit("finshLoad");
    },
  },
};
</script>

<style scoped>
.feature {
  width: 100%;
}
.feature img {
  width: 100%;
}
</style>
