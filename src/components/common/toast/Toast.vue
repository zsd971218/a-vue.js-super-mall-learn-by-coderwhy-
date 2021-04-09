<template>
  <div
    class="toast"
    :class="{ active: isShow }"
  >
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    show(msg, timer) {
      this.isShow = true;
      this.message = msg;
      if (!timer) {
        timer = 1500;
      }

      setTimeout(() => {
        this.isShow = false;
      }, timer);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 10px 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 6px;
  opacity: 0;
  transition: all 1s linear;
}
.active {
  opacity: 1;
  transition: all 0s linear;
}
</style>
