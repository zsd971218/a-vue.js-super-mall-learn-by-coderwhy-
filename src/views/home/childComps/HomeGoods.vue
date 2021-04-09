<template>
  <div class="home-goods">
    <div
      class="home-goods-item"
      v-for="(item, index) in goods"
      :key="index"
      @click="clickLink(item.iid)"
    >
      <img
        :src="item.show.img"
        @load="loadImage"
      />
      <div class="title">{{ item.title | substr }}</div>
      <div class="price-save">
        <span class="price">￥{{ item.price }}</span>
        <span class="save">{{ item.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { goodsMixin } from "common/mixin.js";
export default {
  name: "Goods",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [goodsMixin],
};
</script>

<style scoped>
.home-goods {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
  font-size: 12px;
}
.home-goods-item {
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.home-goods-item img {
  width: 100%;
  border-radius: 5px;
}
.price-save {
  display: flex;
  justify-content: space-around;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
}
.price {
  flex: 1;
  color: red;
}
.save {
  flex: 1;
  color: red;
  position: relative;
  padding-left: 20px;
  text-align: left;
}
.save::before {
  content: "";
  display: block;
  position: absolute;
  left: 2px;
  top: 6px;
  width: 16px;
  height: 16px;
  background: url(~assets/img/detail/detail_bottom.png) 0px 0px;
  background-size: 16px;
}
</style>
