<template>
  <div class="detail-shop">
    <div class="shop-name">
      <div class="logo"><img
          :src="shopInfo.logo"
          alt=""
        /></div>
      <span>{{ shopInfo.title }}</span>
    </div>
    <div class="des">
      <div class="left">
        <span class="sale-number">
          <p>{{ shopInfo.sells }}</p>
          <p>总销量</p>
        </span>
        <span class="all-baby">
          <p>{{ shopInfo.goods }}</p>
          <p>全部宝贝</p>
        </span>
      </div>
      <div class="right">
        <div
          class="item"
          v-for="(item, index) in shopInfo.score"
          :key="index"
        >
          <span class="wenzi">{{ item.name }}</span>
          <span
            class="score"
            :class="{ active: item.isBetter }"
          >{{
            item.score
          }}</span>
          <span
            class="high"
            :class="{ active: item.isBetter }"
          >{{
            item.isBetter ? "高" : "低"
          }}</span>
        </div>
      </div>
    </div>
    <div class="in">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "DetailShop",
  props: {
    shopInfo: {},
  },
};
</script>

<style scoped>
.detail-shop {
  border-bottom: 3px solid #f2f5f8;
  padding-bottom: 20px;
}
.shop-name {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  margin: 20px 10px;
}
.logo {
  display: inline-block;
  border-radius: 15px;
  margin-right: 15px;
}
.logo img {
  vertical-align: middle;
  height: 30px;
  border-radius: 15px;
}
.des {
  display: flex;
  align-items: center;
}
.left,
.right {
  flex: 1;
  display: flex;
  justify-content: center;
}
.left {
  align-items: center;
  border-right: 1px solid #ccc;
}
.right {
  flex-direction: column;
  align-items: center;
}
.sale-number,
.all-baby {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin: 0px 10px;
}
p {
  margin: 5px 0px;
}
.item {
  width: 100%;
}
.item span {
  display: inline-block;
  line-height: 30px;
  font-size: 12px;
}
.wenzi {
  padding-left: 10px;
}
.score {
  color: red;
  width: 50px;
  padding: 0px 10px;
}
.high {
  color: green;
}
.active {
  color: red;
}
.in {
  margin: auto;
  width: 150px;
  padding: 5px 20px;
  background-color: #f2f5f8;
  border-radius: 10px;
  text-align: center;
}
</style>
