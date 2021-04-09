<template>
  <div class="bottom-bar">
    <div class="service">
      <span id="one"></span>
      <span>客服</span>
    </div>
    <div class="shop">
      <span id="two"></span>
      <span>店铺</span>
    </div>
    <div class="save">
      <span id="three"></span>
      <span>收藏</span>
    </div>
    <div
      class="shop-car"
      @click="addCar"
    >
      <span id="four"></span>
      <span>加入购物车</span>
    </div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  methods: {
    addCar() {
      this.$emit("addCar");
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 2;
  display: flex;
  width: 100%;
  height: 49px;
  background-color: #fff;
  font-size: 12px;
  box-shadow: 0px -2px 0px rgba(100, 100, 100, 0.1);
}
.bottom-bar div:nth-child(-n + 3) {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bottom-bar div span:first-child {
  height: 25px;
  width: 25px;
  background: url(~assets/img/detail/detail_bottom.png) 0px 0px no-repeat;
  background-size: 22px;
}
#one {
  background-position: 0px -48px;
}
#two {
  background-position: 2px -94px;
}
#three {
  background-position: 2px 5px;
}
#four {
  background: url(~assets/img/cart/car.png) -12px 2px no-repeat;
  background-size: 50px;
}
.shop-car,
.buy {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 25%;
}
.shop-car {
  background-color: #ffe817;
}
.buy {
  background-color: #ff6699;
  color: #fff;
}
</style>
