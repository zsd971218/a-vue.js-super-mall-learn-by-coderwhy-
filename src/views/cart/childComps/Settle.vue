<template>
  <div class="settle">
    <div
      class="total"
      @click="checkAll"
    >
      <check :isAdd="isShowAll"></check><span>全选</span>
    </div>
    <div class="all">合计:￥{{ money }}</div>
    <div
      class="go"
      @click="sclick"
    >结算({{ num }})</div>
  </div>
</template>

<script>
import Check from "./Check";
export default {
  components: { Check },
  name: "Settle",
  props: {
    ps: {},
  },
  computed: {
    money() {
      return this.$store.state.carList
        .filter((item) => item.isSettle === true)
        .reduce((pre, item) => {
          return pre + parseInt(item.price) * item.count;
        }, 0)
        .toFixed(2);
    },
    num() {
      return this.$store.state.carList.filter((item) => item.isSettle === true)
        .length;
    },
    isShowAll() {
      let a = this.$store.state.carList;
      if (a.length === 0) {
        return false;
      } else if (a.find((item) => item.isSettle === false)) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    checkAll() {
      if (this.isShowAll) {
        this.$store.commit("checkAll");
      } else {
        this.$store.commit("removeAll");
      }
    },
    sclick() {
      this.$emit("sclick");
    },
  },
};
</script>

<style scoped>
.settle {
  position: fixed;
  bottom: 49px;
  left: 0px;
  display: flex;
  width: 100%;
  height: 32px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 0px 10px;
  font-size: 14px;
  text-align: center;
}
.total {
  display: flex;
  width: 30%;
  align-items: center;
}
.total span {
  padding: 2px 5px 0px;
}
.all {
  width: 40%;
  color: red;
}
.go {
  width: 30%;
  height: 100%;
  background-color: red;
  color: #fff;
  line-height: 32px;
}
</style>
