<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ list.length }})</div>
    </nav-bar>
    <scroll
      class="scroll"
      ref="scroll"
    >
      <goods-list
        :list="list"
        @imgLoad="load"
      ></goods-list>
    </scroll>
    <settle @sclick="sclick"></settle>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "./childComps/GoodsList";
import Settle from "./childComps/Settle";
export default {
  components: { NavBar, Scroll, GoodsList, Settle },
  name: "Cart",
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.list = this.$store.state.carList;
    console.log(this.list);
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    load() {
      this.$refs.scroll.refresh();
    },
    sclick() {
      let a = this.$store.state.carList;
      let flag = true;
      a.forEach((item) => {
        if (item.isSettle) {
          flag = false;
        }
      });
      if (a.length === 0 || flag) {
        this.$toast.show("请选择商品");
      }
    },
  },
};
</script>
<style scoped>
.nav-bar {
  background-color: #ff8198;
}
.scroll {
  position: absolute;
  top: 44px;
  bottom: 79px;
  overflow: hidden;
  width: 100%;
}
</style>
