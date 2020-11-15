<template>
<van-nav-bar title="新的回忆">
    <template #right>
        <van-button size="small" :disabled="disabled" :type="type" @click="save">保存</van-button>
    </template>
</van-nav-bar>
<van-field type="textarea" placeholder="这一刻的想法..." rows="2" autosize v-model="story" />
<van-field label="城市" name="城市" v-model="city" />
<van-uploader v-model="files" multiple accept="image" :after-read="afterRead" />
</template>

<script>
export default {
    data() {
        return {
            story: "",
            city: "",
            disabled: true,
            type: "default",
            files: []
        }
    },
    methods: {
        save() {
            const user_id = localStorage.getItem("token");
            this.axios.post(`${process.env.VUE_APP_BACKEND}/memory`, {
                "story": this.story,
                "city": this.city,
                "user_id": user_id,
                "imgs": this.files
            }).then((response) => {
                console.log(response.data);
                this.$router.push("/");
            });
        },
        afterRead(file) {
            this.disabled = false;
            this.type = "success";
            let params = new FormData();
            params.append("memory", file.file);
            this.axios.post(`${process.env.VUE_APP_BACKEND}/memory/upload`, params).then((response) => {
                this.files = [{
                    url: `${process.env.VUE_APP_STATIC}/img/${response.data}`
                }];
                console.log("files name:", response.data);

                console.log("files222:", this.files);
            });
        }
    }
}
</script>
