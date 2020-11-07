<template>
<van-nav-bar title="个性签名" left-arrow @click-left="onClickLeft">
    <template #right>
        <van-button size="small" :disabled="disabled" :type="type" @click="save">保存</van-button>
    </template>
</van-nav-bar>
<van-field v-model="brief" name="个性签名" placeholder="个性签名" @input="input" maxlength="30" show-word-limit />
<div class="desc">个性签名让你的朋友更了解你。</div>
</template>

<script>
export default {
    data() {
        return {
            brief: "",
            type: "default",
            disabled: true
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        save() {
            const user_id = localStorage.getItem("token");
            this.axios
                .patch(`${process.env.VUE_APP_BACKEND}/user/${user_id}`, {
                    "brief": this.brief
                })
                .then(() => {
                    this.$router.push("/userinfo");
                });
        },
        input() {
            this.type = "success";
            this.disabled = false;
        }
    },
    mounted() {
        const user_id = localStorage.getItem("token");
        this.axios
            .get(`${process.env.VUE_APP_BACKEND}/user/${user_id}`)
            .then((response) => {
                this.brief = response.data.brief;
            });
    }
};
</script>

<style>
.van-field {
    margin-top: 10px;
}

.desc {
    padding: 15px;
    color: #CCCCCC;
    font-size: small;
}
</style>
