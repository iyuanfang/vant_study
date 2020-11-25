<template>
  <div class="home">
    <van-nav-bar title="首页" fixed class="navbar" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="list"
      >
        <van-row v-for="item of list" :key="item._id" class="row">
          <van-col span="24">
            <div class="imgbox">
              <van-image
                :src="getCompressImg(item.imgs[0])"
                class="img"
                radius="10"
                @click="viewMemory(item._id)"
              />
            </div>
            <div class="content">
              <div class="van-multi-ellipsis--l3">{{ item.story }}</div>
              <div class="location">
                <van-icon name="location-o" />{{ item.city }}
              </div>
              <div class="date">
                {{ this.showtime(item.date) }}
                <div style="float: right">
                  <van-icon
                    name="ellipsis"
                    size="20px"
                    @click="showAction(item._id)"
                  />
                </div>
              </div>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }

      const user_id = localStorage.getItem("token");
      const pagesize = 3; //每页3条
      this.axios
        .get(
          `${process.env.VUE_APP_BACKEND}/memory/user/${user_id}/${pagesize}/${this.list.length}`
        )
        .then((response) => {
          const memories = response.data;
          this.list = this.list.concat(memories);
          console.log("list:", this.list);
          //Array.prototype.push.apply(this.list, memories);
          this.loading = false;
          if (memories.length < pagesize) {
            this.finished = true;
          }
        });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    viewMemory(id) {
      this.$router.push('/memory/'+id);
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
    getCompressImg(src){
        return `${process.env.VUE_APP_STATIC}/img/${src}.jpg`;
    }
  },
};
</script>

<style>
.row {
  margin: 20px;
}

.van-pull-refresh {
  margin-top: 40px;
}

.van-multi-ellipsis--l3 {
  margin: 10px 0;
}

.content {
  padding: 0 10px 10px 10px;
}

.view {
  font-size: medium;
}

.img{
  width: 100%;
  margin: 0 0;
}

.location {
  font-size: small;
}

.date {
  font-size: small;
  margin-top: 5px;
}
</style>
