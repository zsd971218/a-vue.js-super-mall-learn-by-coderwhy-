<template>
  <div class="hy-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <!-- 这个插槽用于放置轮播图的图片 -->
      <slot></slot>
    </div>
    <div class="indicator">
      <!-- 这个插槽显示轮播图下方的圆点,根据用户传递的参数确定是否显示 -->
      <slot
        name="indicator"
        v-if="showIndicator && slideCount > 1"
      >
        <div
          v-for="(item, index) in slideCount"
          :key="index"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      //父组件传入的定时器间隔时间
      type: Number,
      default: 3000,
    },
    animDuration: {
      //父组件传入的动画过度时间
      type: Number,
      default: 300,
    },
    moveRatio: {
      //父组件传入的手指拖动宽度比例为多少时切换下一张
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      //是否显示下方小圆点
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, //图片数量
      totalWidth: 0, //轮播图组件宽度
      swiperStyle: {}, //组件样式
      currentIndex: 1, //当前的滚动距离（index代表滚动了几张图片的距离）
      scrolling: false, //轮播图是否正在滚动
    };
  },

  //页面html元素加载完成后执行该函数
  mounted: function () {
    //html加载0.1秒后执行
    setTimeout(() => {
      //执行该函数为轮播图dom添加新的元素，以此实现无缝衔接
      this.handleDom();
      this.startTimer();
    }, 500);
  },
  methods: {
    handleDom() {
      //1.获取要操作的元素
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.querySelectorAll(".slide");
      //2.设置图片count个数
      this.slideCount = slidesEls.length;
      //3.如果图片数大于1，克隆第一个和最后一个元素，并且插入到dom中
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      //让swiper元素显示第一个
      this.setTransform(-this.totalWidth);
    },
    //定时器方法的实现
    //开启定时器
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    //停止定时器
    stopTimer() {
      window.clearInterval(this.playTimer);
    },
    //实现元素的滚动特效函数
    setTransform(position) {
      this.swiperStyle.transform = `translate(${position}px,0)`;
    },
    //实现检查index数值的函数，及时实现无缝衔接
    checkPosition() {
      window.setTimeout(() => {
        if (this.currentIndex >= this.slideCount + 1) {
          this.swiperStyle.transition = "0ms";
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.swiperStyle.transition = "0ms";
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        //完成滚动后的回调
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },
    //封装滚动函数
    scrollContent(currentPosition) {
      //设置scrolling
      this.scrolling = true;
      //实现滚动
      this.swiperStyle.transition = this.animDuration + "ms";
      this.setTransform(currentPosition);
      //判断滚动位置
      this.checkPosition();
      //设置scrolling
      this.scrolling = false;
    },
    //封装处理手指拖动元素的函数
    touchStart(e) {
      //1.如果正在滚动，则不可以拖动
      if (this.scrolling) {
        return;
      }
      //2.停止定时器
      this.stopTimer();
      //记录手指起始位置
      this.startX = e.touches[0].pageX;
    },
    //手指移动事件
    touchMove(e) {
      //判断移动距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let currentDistance = currentPosition + this.distance;
      //实现移动
      this.setTransform(currentDistance);
    },
    //手指抬起事件
    touchEnd(e) {
      let currentMove = Math.abs(this.distance);
      if (currentMove > this.moveRatio * this.totalWidth && this.distance > 0) {
        this.currentIndex--;
      } else if (
        currentMove > this.moveRatio * this.totalWidth &&
        this.distance < 0
      ) {
        this.currentIndex++;
      }
      //实现移动
      this.scrollContent(-this.currentIndex * this.totalWidth);
      //开启定时器
      this.startTimer();
    },
  },
};
</script>

<style scoped>
.hy-swiper {
  position: relative;
  overflow: hidden;
}
.swiper {
  display: flex;
}
.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  margin: 0 5px;
}
.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
