<template>
  <div class="item-info">
    <div class="content">
      <span>{{ info.desc }}</span>
      <div class="start"></div>
      <div class="end"></div>
    </div>
    <div class="dress">{{ info.data.key }}</div>
    <ul class="show">
      <li
        v-for="(item, index) in info.data.list"
        :key="index"
      >
        <img
          :src="item"
          alt=""
          @load="load"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce } from "common/util.js";
export default {
  name: "ItemInfo",
  props: {
    info: {
      type: Object,
    },
  },
  data() {
    return {
      res: null,
    };
  },
  methods: {
    imgLoad() {
      this.$emit("imgLoad");
      //console.log("refresh");
    },
    load() {
      this.res();
    },
  },
  mounted() {
    this.res = debounce(this.imgLoad, 200);
  },
};
</script>

<style scoped>
.item-info {
  margin-top: 15px;
  border-bottom: 3px solid #ccc;
}
.content {
  position: relative;
  padding: 10px;
  font-size: 12px;
  line-height: 20px;
}
.dress {
  padding-left: 10px;
  line-height: 40px;
  font-size: 14px;
  color: black;
}
.start,
.end {
  position: absolute;
  height: 1px;
  width: 25%;
  background-color: #bbb;
}
.start {
  left: 5px;
  top: -2px;
}
.end {
  right: 0px;
  bottom: -2px;
}
.start::before,
.end::before {
  content: "";
  display: block;
  position: absolute;
  top: -4px;
  width: 4px;
  height: 4px;
  background-color: black;
}
.right::before {
  left: 0px;
}
.end::before {
  right: 0px;
}
.show img {
  width: 100%;
}
</style>
