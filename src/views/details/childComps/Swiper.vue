<template>
  <swiper class="detail-swiper">
    <swiper-item
      v-for="(item, index) in swiperImage"
      :key="index"
    >
      <img
        :src="item"
        alt=""
      />
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  components: { Swiper, SwiperItem },
  name: "DetailSwiper",
  props: {
    swiperImage: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 240px;
}
</style>
