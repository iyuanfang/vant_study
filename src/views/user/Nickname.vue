<template>
<van-nav-bar title="昵称" left-arrow @click-left="onClickLeft">
    <template #right>
        <van-button size="small" :disabled="disabled" :type="type" @click="save">保存</van-button>
    </template>
</van-nav-bar>
<van-field v-model="nickname" name="昵称" placeholder="昵称" @input="input" maxlength="10" show-word-limit />
<div class="desc">好昵称可以让你的朋友更容易记住你。</div>
</template>

<script>
export default {
    data() {
        return {
            nickname: "",
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
                    "nickname": this.nickname
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
                this.nickname = response.data.nickname;
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
