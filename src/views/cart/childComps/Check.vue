<template>
  <div
    class="check"
    @click="add"
  >
    <span :class="{ active: isAdd }"><img
        src="~assets/img/cart/tick.svg"
        alt=""
      /></span>
  </div>
</template>

<script>
export default {
  name: "Check",
  props: {
    isAdd: false,
  },
  methods: {
    add() {
      this.$emit("add");
      //console.log(1);
    },
  },
};
</script>

<style scoped>
.check {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
span {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid #ccc;
}
span img {
  width: 100%;
}
.active {
  border-color: #ff8198;
  background-color: #ff8198;
}
</style>
