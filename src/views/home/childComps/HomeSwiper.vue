<template>
  <div>
    <swiper>
      <swiper-item
        v-for="(item, index) in banners"
        :key="index"
      >
        <a
          href="#"
          @click.prevent=""
        >
          <img
            :src="item.image"
            alt=""
            @load="imageLoad"
          />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  name: "HomeSwiper",
  components: { Swiper, SwiperItem },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isload: false,
    };
  },
  methods: {
    imageLoad() {
      if (!this.isload) {
        this.$emit("finshLoad");
        this.isload = true;
        //console.log("swiper");
      }
    },
  },
};
</script>

<style scoped>
</style>
