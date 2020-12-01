<template>
  <van-nav-bar
    title="查看回忆"
    left-arrow
    class="navbar"
    @click-left="onClickLeft"
  >
  </van-nav-bar>
  <div class="author">
  <van-row>
    <van-col span="3">
    <van-image
      round
      width="40px"
      height="40px"
      :src="avatar"
    />
    </van-col>
    <van-col span="12" >
    <font size="4" class="nickname">{{ author.nickname }}</font></van-col>
  <van-col span="1" offset="8">
    <van-icon
      align="right"
      name="ellipsis"
      size="20px"
      @click="share(memory._id)"
    /></van-col>
  </van-row>
  </div>
  <div v-for="(img, index) in memory.imgs" :key="index" class="imgs">
    <van-image
      :src="getCompressImg(img)"
      @click="preview(index)"
    />
  </div>
  <div class="content">
    <div>{{ memory.story }}</div>
    <div class="location"><van-icon name="location-o" />{{ memory.city }}</div>
    <div class="date">
      {{ this.showtime(memory.date) }}
      <div v-if="user_id" style="float: right">
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
      user_id: null,
      author: {},
      avatar: "",
      imgUrls:[]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    preview(index) {
      ImagePreview({
        images: this.imgUrls, // 预览图片的那个数组
        loop: true,
        startPosition: index, // 指明预览第几张图
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
              this.$router.push('/');
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    getCompressImg(src){
        return `${process.env.VUE_APP_STATIC}/img/${src}.jpg`;
    }
  },
  mounted() {
    this.user_id = localStorage.getItem("token");
    this.axios
      .get(`${process.env.VUE_APP_BACKEND}/memory/${this.$route.params.id}`)
      .then((response) => {
        this.memory = response.data;
        console.log(this.memory);

        for(let img of this.memory.imgs){
            this.imgUrls.push(`${process.env.VUE_APP_STATIC}/img/${img}`);
        }

        const author_id = this.memory.user_id;
        this.axios
          .get(`${process.env.VUE_APP_BACKEND}/user/${author_id}`)
          .then((response) => {
            this.author = response.data;
            this.avatar = `${process.env.VUE_APP_STATIC}/avatar/${this.author.avatar}`;
          });
      });
  },
};
</script>

<style scoped>
.content {
  padding: 10px 20px;
}

.imgs{
    padding: 0 20px;
}

.van-image{
    width: 100%;
}

.author {
  padding: 10px 20px;
}

.nickname {
    line-height: 40px;
}
</style>