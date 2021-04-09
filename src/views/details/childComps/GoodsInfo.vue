<template>
  <div class="goods-info">
    <div class="title">{{ goodsInfo.title }}</div>
    <div class="price">
      <span class="now">{{ goodsInfo.newPrice }}</span>
      <span class="old">{{ goodsInfo.oldPrice }}</span>
      <span class="discount">{{ goodsInfo.discount }}</span>
    </div>
    <div class="popular">
      <span
        v-for="(item, index) in goodsInfo.popular"
        :key="index"
      >
        {{ item }}
      </span>
    </div>
    <div class="service">
      <span
        v-for="(item, index) in goodsInfo.services"
        :key="index"
      >
        <img
          src="~assets/img/detail/icon.png"
          alt=""
        />
        {{ item.name }}
      </span>
    </div>
    <div class="express"></div>
  </div>
</template>

<script>
export default {
  name: "GoodsInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.goods-info {
  border-bottom: 3px solid #f2f5f8;
  padding: 2px 10px;
}
.title {
  padding: 5px 0px;
  font-size: 14px;
  line-height: 26px;
}

.price {
  line-height: 30px;
}
.now {
  padding: 3px 0px;
  font-size: 20px;
  color: hotpink;
}
.old {
  font-size: 12px;
  text-decoration: line-through;
  color: #ccc;
  padding: 0px 15px;
}
.discount {
  background-color: hotpink;
  padding: 0px 5px;
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
}
.popular,
.service {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  line-height: 26px;
  font-size: 12px;
  color: #aaa;
}
.service img {
  height: 12px;
  margin-top: -2px;
  vertical-align: middle;
}
.service {
  color: #333;
}
</style>
