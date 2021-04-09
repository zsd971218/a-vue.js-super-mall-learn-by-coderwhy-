<template>
  <div class="aside-nav">
    <ul>
      <li
        v-for="(item,index) in menuList "
        :key="index"
        :class="{active:index===currentIndex}"
        @click="click(index)"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  components: { Scroll },
  name: "AsideNav",
  props: {
    menuList: {
      type: Array,
      default() {
        return [
          "流行",
          "新款",
          "精选",
          "上衣",
          "裙装",
          "裤子",
          "女鞋",
          "美妆",
          "包包",
          "配饰",
          "春季",
          "冬季",
          "夏季",
          "秋季",
        ];
      },
    },
  },
  data() {
    return {
      //当前活跃页
      currentIndex: 0,
    };
  },
  methods: {
    //选择活跃页
    click(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.aside-nav {
  height: 100%;
  overflow: scroll;
}
ul {
  list-style: none;
}
li {
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
  background-color: peachpuff;
}
.active {
  color: red;
}
</style>