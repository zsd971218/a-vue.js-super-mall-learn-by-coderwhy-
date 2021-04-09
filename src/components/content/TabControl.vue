<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in title"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return ["流行", "新款", "精选"];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {
    // console.log(document.querySelector(".tab-control").offsetTop);
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  width: 100%;
  background-color: #fff;
  box-sizing: content-box;
}
.tab-control-item {
  display: flex;
  flex: 1;
  height: 40px;
  justify-content: center;
  align-items: center;
}
.tab-control-item span {
  padding: 4px;
  font-size: 14px;
}
.active span {
  color: hotpink;
  border-bottom: 2px solid hotpink;
}
</style>
