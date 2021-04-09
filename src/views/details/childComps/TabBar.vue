<template>
  <nav-bar class="bar">
    <div
      slot="left"
      class="left"
      @click="back"
    >
      <img
        src="~assets/img/common/back.svg"
        alt=""
      />
    </div>
    <div
      slot="center"
      class="title"
    >
      <div
        v-for="(item, index) in title"
        :key="index"
        class="title-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailTab",
  components: { NavBar },
  data() {
    return {
      title: ["详情", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.bar {
  color: #333;
}
.left img {
  vertical-align: middle;
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.active {
  color: hotpink;
}
</style>
