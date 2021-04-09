<template>
  <div class="home-recommend">
    <a
      class="recommend-item"
      v-for="(item, index) in recommends"
      :key="index"
      @click.prevent=""
    >
      <img
        :src="item.image"
        alt=""
        @load="finshLoad"
      />
      <span>{{ item.title }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    finshLoad() {
      this.$emit("finshLoad");
      //console.log("recommend");
    },
  },
};
</script>

<style scoped>
.home-recommend {
  display: flex;
  width: 100%;
  padding: 10px 0px;
  background-color: #fff;
}
.recommend-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}
.recommend-item img {
  width: 80%;
  margin-bottom: 5px;
}
.recommend-item span {
  font-size: 12px;
}
</style>
