<template>
  <div class="params">
    <div class="title">{{ params.pkey }}</div>
    <div>
      <ul
        class="pro"
        v-for="(item, index) in params.set"
        :key="index"
      >
        <li class="left">{{ item.key }}</li>
        <li class="right">{{ item.value }}</li>
      </ul>
    </div>
    <div class="title">{{ params.rkey }}</div>
    <ul
      class="rule"
      v-for="(item, index) in params.table"
      :key="index"
    >
      <li
        v-for="(im, ix) in item"
        :key="ix"
      >{{ im }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ParamsInfo",
  props: {
    params: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.params {
  padding: 10px 10px 30px;
  border-bottom: 3px solid #ccc;
}
.pro,
.rule {
  display: flex;
  justify-content: flex-start;
  list-style: none;
  height: 60px;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
}
.title {
  height: 60px;
  line-height: 60px;
  color: #ff6699;
}
.pro .left {
  width: 25%;
}
.pro .right {
  width: 75%;
  color: #f0728b;
}
.rule li {
  flex: 1;
}
</style>
