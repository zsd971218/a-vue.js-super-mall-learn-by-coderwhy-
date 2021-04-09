<template>
  <div class="home">
    <!-- 顶部标题栏 -->
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 复制一个tab控制栏实现tab栏的无缝停留 -->
    <tab-control
      class="tab-two"
      ref="tabTwo"
      @tabClick='tabClick'
      v-show="isShowTab"
    ></tab-control>
    <!-- scroll滚动区域 -->
    <scroll
      class="scroll"
      ref="scrollRef"
      @loadMore='loadMore'
      @getPosition='getPosition'
    >
      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        @finshLoad='finshLoad'
      ></home-swiper>
      <!-- 推荐栏 -->
      <home-recommend
        :recommends='recommends'
        @finshLoad='finshLoad'
      ></home-recommend>
      <!-- 流行区域 -->
      <home-feature @finshLoad='finshLoad'></home-feature>
      <!-- tab控制栏 -->
      <tab-control
        ref="tabOne"
        @tabClick='tabClick'
      ></tab-control>
      <!-- 商品区域 -->
      <home-goods
        :goods="goods[currentType].list"
        @finshLoad='finshLoad'
      ></home-goods>
    </scroll>
    <!-- 返回顶部 -->
    <back-top
      v-show="isShowBackTop"
      @click.native="backTop"
    ></back-top>
  </div>
</template>

<script>
//相关子组件
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommend from "./childComps/HomeRecommend.vue";
import HomeFeature from "./childComps/HomeFeature.vue";
import TabControl from "components/content/TabControl.vue";
import HomeGoods from "./childComps/HomeGoods";
import BackTop from "components/content/BackTop.vue";
//相关网络请求方法
import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    HomeGoods,
    BackTop,
  },
  data() {
    return {
      //轮播图图片
      banners: [],
      //推荐图片
      recommends: [],
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
      //根据index决定获取哪一种类型的商品数据，默认为0，获得pop的商品数据
      currentType: "pop",
      //控制tab栏的停留效果(显示隐藏)
      isShowTab: false,
      // 储存tab栏距离顶部的距离
      tabOffsetTop: 0,
      //控制返回顶部图标显示隐藏
      isShowBackTop: false,
      //记录离开页面时滚动的距离
      saveScrollY: 0,
    };
  },
  created() {
    //从服务器获取首页所需要数据
    this.getHomeMultidata();
    this.getHomeGoods("pop", this.goods.pop.page);
    this.getHomeGoods("new", this.goods.pop.page);
    this.getHomeGoods("sell", this.goods.pop.page);
  },
  //进入页面是刷新better-scroll
  activated() {
    this.$refs.scrollRef.refresh();
    this.$refs.scrollRef.back(this.saveScrollY, 0);
  },
  deactivated() {
    // console.log("homedeactived");
    this.saveScrollY = this.$refs.scrollRef.scroll.absStartY;
  },
  methods: {
    //从服务器获取轮播图数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //从服务器获取商品数据
    getHomeGoods(type, page) {
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        //console.log(this.goods[type].list);
        page++;
      });
    },
    //点击tab栏切换商品类型
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabOne.currentIndex = index;
      this.$refs.tabTwo.currentIndex = index;
    },
    //上拉加载更多
    loadMore() {
      //console.log(1);
      const type = this.currentType;
      this.getHomeGoods(type, this.goods[type].page);
      this.$refs.scrollRef.finishPullUp();
    },
    //加载图片时更新betterscroll
    finshLoad() {
      //console.log(1);
      this.$refs.scrollRef.refresh();
      //获取tab栏距离顶部距离
      this.tabOffsetTop = this.$refs.tabOne.$el.offsetTop;
      //console.log(this.tabOffsetTop);
    },
    //当屏幕滚动式触发事件
    getPosition(position) {
      if (-this.tabOffsetTop > position.y) {
        this.isShowTab = true;
      } else {
        this.isShowTab = false;
      }
      if (position.y < -1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    //返回顶部
    backTop() {
      this.$refs.scrollRef.back(0, 500);
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
}
.scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tab-two {
  position: fixed;
  top: 44px;
  left: 0px;
  z-index: 9;
}
</style>