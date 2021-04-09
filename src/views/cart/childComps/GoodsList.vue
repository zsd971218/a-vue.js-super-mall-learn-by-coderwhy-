<template>
  <div class="cart">
    <div
      class="car-list"
      v-for="item in list"
    >
      <check
        class="check"
        :isAdd="item.isSettle"
        @add="add(item)"
      ></check>
      <div class="img"><img
          :src="item.image"
          alt=""
          @load="imgLoad"
        /></div>
      <div class="right">
        <div class="title">{{ item.title | sstr }}</div>
        <div class="content">{{ item.content | lstr }}</div>
        <div class="price">
          <span class="money">￥{{ item.price }}</span>
          <span class="number">x{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Check from "./Check";
export default {
  name: "CarLsit",
  components: { Check },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imgLoad() {
      this.$emit("imgLoad");
    },
    add(item) {
      item.isSettle = !item.isSettle;
    },
  },
  filters: {
    sstr(item) {
      return item.trim().substr(0, 10) + "...";
    },
    lstr(item) {
      return item.trim().substr(0, 25) + "...";
    },
  },
};
</script>

<style scoped>
.car-list {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}

.img img {
  height: 80px;
  width: 54px;
  border-radius: 5px;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
}
.title {
  font-size: 14px;
}
.content {
  font-size: 12px;
  color: #aaa;
}
.price {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.money {
  color: red;
}
</style>
