<template>
  <div class="scroll-wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      dafault: 3,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector(".scroll-wrapper"), {
      click: true,
      probeType: 3,
      pullUpLoad: true,
    });
    this.scroll.on("scroll", (position) => {
      //console.log(position);
      this.$emit("getPosition", position);
    });
    this.scroll.on("pullingUp", () => {
      //console.log("上拉加载");
      this.$emit("loadMore");
    });
  },
  methods: {
    //滚动到指定位置
    back(scrollY, time) {
      this.scroll.scrollTo(0, scrollY, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    //更新scroll对象
    refresh() {
      this.scroll.refresh();
      //console.log("refresh");
    },
  },
};
</script>

<style scoped>
.scroll-wrapper {
  overflow: hidden;
}
</style>

