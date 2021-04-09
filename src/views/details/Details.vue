<template>
  <div class="details">
    <!-- 顶部导航栏 -->
    <tab-bar
      ref="tabBarRef"
      @tabClick='tabClick'
    ></tab-bar>
    <scroll
      class="scroll"
      ref="scrollRef"
      @getPosition='getPosition'
    >
      <!-- 轮播图 -->
      <swiper :swiperImage='swiperImage'></swiper>
      <!-- 商品信息 -->
      <goods-info :goodsInfo="goodsInfo"></goods-info>
      <!-- 店铺数据 -->
      <shop-info :shopInfo='shopInfo'></shop-info>
      <!-- 展示图片 -->
      <item-info
        :info="itemInfo"
        @imgLoad='finshLoad'
      ></item-info>
      <!-- 参数信息 -->
      <params-info
        :params='paramsInfo'
        ref="paramsRef"
      ></params-info>

      <!-- 评论信息 -->
      <comment
        :comment="comment"
        ref="commentRef"
      ></comment>
      <!-- 推荐 -->
      <recommend
        :goods="recommend"
        ref="recommendRef"
        @finshLoad='finshLoad'
      ></recommend>
    </scroll>
    <!-- 底部tab栏 -->
    <bottom-bar @addCar='addCar'></bottom-bar>
    <!-- 返回顶部图标 -->
    <back-top
      v-show="isShowBack"
      @click.native="backTop"
    ></back-top>
  </div>
</template>

<script>
// 导入相关组件
import TabBar from "./childComps/TabBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import Swiper from "./childComps/Swiper.vue";
import GoodsInfo from "./childComps/GoodsInfo.vue";
import ShopInfo from "./childComps/ShopInfo.vue";
import ItemInfo from "./childComps/ItemInfo.vue";
import ParamsInfo from "./childComps/ParamsInfo.vue";
import Comment from "./childComps/Comment.vue";
import Recommend from "./childComps/Recommend.vue";
import BackTop from "../../components/content/BackTop.vue";
import BottomBar from "./childComps/BottomBar.vue";
// 导入相关方法
import {
  getDetailsData,
  getRecommend,
  DetailGoods,
  Shop,
  Params,
} from "network/details.js";

export default {
  name: "Details",
  components: {
    TabBar,
    Swiper,
    Scroll,
    GoodsInfo,
    ShopInfo,
    ItemInfo,
    ParamsInfo,
    Comment,
    Recommend,
    BackTop,
    BottomBar,
  },
  data() {
    return {
      // 轮播图图片
      swiperImage: [],
      //商品信息
      goodsInfo: {},
      // 店铺数据
      shopInfo: {},
      //展示图片
      itemInfo: {
        desc: "",
        data: {},
      },
      //参数信息
      paramsInfo: {},
      //评论信息
      comment: [],
      // 推荐信息
      recommend: [],
      //记录每个组件距离顶部距离
      topValue: [0, 0, 0, 0],
      //为了防止点击导航栏触发页面滚动函数
      flag: true,
      //记录页面滚动到哪个菜单
      currentIndex: 0,
      //是否显示返回顶部图标
      isShowBack: false,
    };
  },
  // 获取数据
  created() {
    const id = this.$route.params.iid;
    this.getDetailsData(id);
    this.getRecommend();
  },
  //进入页面时刷新better-scroll
  activated() {
    this.$refs.scrollRef.refresh();
  },
  methods: {
    getDetailsData(id) {
      getDetailsData(id).then((res) => {
        //console.log(res.result);
        const result = res.result;
        //轮播图图片数据
        this.swiperImage = result.itemInfo.topImages;
        // 商品信息数据
        this.goodsInfo = new DetailGoods(
          result.itemInfo,
          result.shopInfo.services,
          result.columns
        );
        //店铺信息数据
        this.shopInfo = new Shop(result.shopInfo);
        //展示数据
        this.itemInfo.desc = result.detailInfo.desc;
        this.itemInfo.data = result.detailInfo.detailImage[0];
        //参数信息
        this.paramsInfo = new Params(result.itemParams);
        //评论信息
        this.comment = result.rate.list;
      });
    },
    //获取推荐信息
    getRecommend() {
      getRecommend().then((res) => {
        //console.log(res);
        this.recommend = res.data.list;
      });
    },
    //页面滚动时触发事件
    getPosition(position) {
      if (this.flag) {
        //console.log(position.y);
        for (let i = 0; i < this.topValue.length; i++) {
          if (-position.y >= this.topValue[i] && this.currentIndex !== i) {
            this.currentIndex = i;
            //console.log(this.currentIndex);
          }
        }
        this.$refs.tabBarRef.currentIndex = this.currentIndex;
        //console.log(this.$refs.tabBarRef.currentIndex);
      }
      if (-position.y > 1000) {
        this.isShowBack = true;
      } else {
        this.isShowBack = false;
      }
    },
    //返回顶部
    backTop() {
      this.$refs.scrollRef.back(0, 300);
    },
    //点击导航栏页面滚动事件
    tabClick(index) {
      this.flag = false;
      const value = this.topValue[index];
      this.$refs.scrollRef.back(-value, 300);
      setTimeout(() => {
        this.flag = true;
      }, 300);
    },
    //加入购物车
    addCar() {
      //保存购物车信息
      const obj = {};
      const im = this.goodsInfo;
      console.log(im);
      obj.price = im.lowNowPrice;
      obj.image = this.swiperImage[0];
      obj.title = im.title;
      obj.content = this.itemInfo.desc;
      obj.iid = this.$route.params.iid;
      obj.count = 1;
      //console.log(obj);
      this.$store.dispatch("addCar", obj).then((res) => {
        console.log(res);
        this.$toast.show(res, 1000);
      });
      console.log(this.$store.state.carList);
    },
    finshLoad() {
      //图片加载完成后刷新betterscroll并且获取topvalue
      //console.log(1);
      this.$refs.scrollRef.refresh();
      this.topValue[1] = this.$refs.paramsRef.$el.offsetTop;
      this.topValue[2] = this.$refs.commentRef.$el.offsetTop;
      this.topValue[3] = this.$refs.recommendRef.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
.scroll {
  position: absolute;
  z-index: 1;
  background-color: #fff;
  top: 44px;
  bottom: 49px;
}
</style>

