<template>
  <van-nav-bar title="新的回忆">
    <template #right>
      <van-button size="small" :disabled="disabled" :type="type" @click="save"
        >保存</van-button
      >
    </template>
  </van-nav-bar>
  <van-field
    type="textarea"
    placeholder="这一刻的想法..."
    rows="2"
    autosize
    v-model="story"
  />
  <van-field label="城市" name="城市" v-model="city" />
  <van-uploader
    v-model="files"
    accept="image"
    max-count="9"
    multiple
    :after-read="afterRead"
    @delete="deleteImg"
  />
</template>

<script>
export default {
  data() {
    return {
      story: "",
      city: "定位中",
      disabled: true,
      type: "default",
      files: [],
    };
  },
  methods: {
    save() {
      let params = new FormData();
      console.log(this.files);
      for (var file of this.files) {
        params.append("memory", file.file);
      }
      this.axios
        .post(`${process.env.VUE_APP_BACKEND}/memory/upload`, params)
        .then((response) => {
          var imgs = response.data;
          const user_id = localStorage.getItem("token");
          this.axios
            .post(`${process.env.VUE_APP_BACKEND}/memory`, {
              story: this.story,
              city: this.city,
              user_id: user_id,
              imgs: imgs,
            })
            .then((response) => {
              console.log(response.data);
              this.$router.push("/");
            });
        });
    },
    afterRead() {
      this.disabled = false;
      this.type = "success";
    },
    deleteImg() {
      this.disabled = true;
      this.type = "default";
    },
    showPosition(position) {
      this.city = position.city;
    },
    showErr() {
      this.city = "定位失败";
    },
    init() {
      var geolocation = new window.qq.maps.Geolocation();
      geolocation.getIpLocation(this.showPosition, this.showErr);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
