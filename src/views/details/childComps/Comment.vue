<template>
  <div class="comment">
    <div class="title">
      <span class="biaoti">用户评价</span>
      <span>更多</span>
    </div>
    <ul class="list">
      <li
        v-for="(item,index) in comment"
        :key="item.uid"
      >
        <div class="user">
          <img
            :src="item.user.avatar"
            alt=""
          />
          <span>{{ item.user.uname }}</span>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="picture">
          <span
            v-for="(item,index) in item.images "
            :key="index"
          >
            <img
              :src="item"
              alt=""
            >
          </span>
          <span></span>
          <span></span>
        </div>
        <div class="detail">
          <span>{{ item.created | formatDate }}</span>
          <span>{{item.style }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    formatDate(data) {
      let time = new Date(data * 1000);
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = time.getDate();
      d = d < 10 ? "0" + d : d;
      return [y, m, d].join("-");
    },
  },
};
</script>

<style scoped>
.biaoti {
  color: #ff6699;
}
.comment {
  padding: 10px 10px 15px;
  border-bottom: 3px solid #ccc;
}
.null {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  text-align: center;
  color: #ccc;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}
.list .user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  margin: 15px 0px;
}
.user img {
  border-radius: 20px;
  height: 40px;
  margin-right: 10px;
}
.content {
  color: #333;
  font-size: 12px;
  line-height: 20px;
}
.picture {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
}
.picture span {
  width: 30%;
}
.picture img {
  width: 100%;
}
.detail {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  font-size: 12px;
  color: #666;
}
.detail span {
  margin-right: 15px;
}
</style>
