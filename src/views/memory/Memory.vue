<template>
  <van-nav-bar
    title="查看回忆"
    left-arrow
    class="navbar"
    @click-left="onClickLeft"
  >
  </van-nav-bar>
  <div v-if="memory.imgs" class="imgbox">
    <van-image
      :src="memory.imgs[0].url"
      class="img"
      @click="preview(memory.imgs[0].url)"
    />
  </div>
  <div class="content">
    <div>{{ memory.story }}</div>
    <div class="location"><van-icon name="location-o" />{{ memory.city }}</div>
    <div class="date">
      {{ this.showtime(memory.date) }}
      <div style="float: right">
        <van-icon name="ellipsis" size="20px" @click="showAction(memory._id)" />
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      memory: {},
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    preview(url) {
      ImagePreview({
        images: [url], // 预览图片的那个数组
        loop: false,
        startPosition: 0, // 指明预览第几张图
        closeOnPopstate: true,
        closeable: true,
      });
    },
    showtime(date) {
      var str = new Date(date).toLocaleString("chinese", { hour12: false });
      return str.substring(0, str.length - 3);
    },
    showAction(id) {
      this.$dialog
        .confirm({
          title: "删除回忆",
          message: "你确定要删除这个回忆吗？",
        })
        .then(() => {
          this.axios
            .delete(`${process.env.VUE_APP_BACKEND}/memory/${id}`)
            .then(() => {
              console.log("删除id:", id);
              this.$router.go(0); //页面刷新
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {
    this.axios
      .get(`${process.env.VUE_APP_BACKEND}/memory/${this.$route.params.id}`)
      .then((response) => {
        this.memory = response.data;
        console.log(this.memory);
      });
  },
};
</script>

<style scoped>
.content {
  padding: 10px;
}
</style>