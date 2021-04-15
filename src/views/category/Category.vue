<template>
  <div class="category">
    <!-- 标题 -->
    <nav-bar>
      <div slot="center">分类</div>
    </nav-bar>
    <!-- 整体布局 -->
    <div class='container'>
      <div class="left">
        <aside-nav @tabClick='tabClick'></aside-nav>
      </div>
      <div class="right">
        <!-- 滚动组件 -->
        <scroll
          class="scroll"
          ref="scrollRef"
          @loadMore='loadMore'
        >
          <cate-goods
            :goods="goods[currentType].list"
            @finshLoad='finshLoad'
          ></cate-goods>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
//导入相关组件
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import AsideNav from "./childComps/AsideNav.vue";
// 导入网络请求方法
import { getHomeGoods } from "network/home.js";
import CateGoods from "./childComps/CateGoods.vue";
export default {
  name: "Category",
  components: { NavBar, Scroll, AsideNav, CateGoods },
  data() {
    return {
      //商品列表
      goods: {
        pop: {
          page: 1,
          list: [],
        },
        new: {
          page: 1,
          list: [],
        },
        sell: {
          page: 1,
          list: [],
        },
      },
      //当前分类
      currentType: "pop",
    };
  },
  created() {
    //从服务器获取首页所需要数据
    this.getHomeGoods("pop", this.goods.pop.page);
    this.getHomeGoods("new", this.goods.pop.page);
    this.getHomeGoods("sell", this.goods.pop.page);
  },
  methods: {
    //从服务器获取商品数据
    getHomeGoods(type, page) {
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        //console.log(this.goods[type].list);
        page++;
      });
    },
    finshLoad() {
      this.$nextTick(() => {
        this.$refs.scrollRef.refresh();
        //console.log(1);
      });
    },
    //加载更多
    loadMore() {
      const type = this.currentType;
      const page = this.goods[type].page;
      this.getHomeGoods(type, page);
      this.$refs.scrollRef.finishPullUp();
    },
    // 切换分类
    tabClick(index) {
      switch (index) {
        case 0: {
          this.currentType = "pop";
          break;
        }
        case 1: {
          this.currentType = "new";
          break;
        }
        case 2: {
          this.currentType = "sell";
          break;
        }
        default: {
          this.currentType = "pop";
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
}
.container {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
  display: flex;
}
.left {
  flex: 1;
  height: 100%;
}
.scroll {
  height: 100%;
}
.right {
  flex: 5;
}
</style>