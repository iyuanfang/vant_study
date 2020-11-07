<template>
<van-nav-bar title="登录" right-text="注册" @click-right="regist" />
<van-form @submit="onSubmit" class="form">
    <van-field v-model="name" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
    <van-field v-model="pwd" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
    <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
            登录
        </van-button>
    </div>
</van-form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            pwd: ''
        };
    },
    methods: {
        regist() {
            this.$router.push({
                path: "/regist",
                query: {
                    redirect: this.$route.query.redirect
                }
            });
        },
        onSubmit() {
            console.log("submit", this.name);
            this.axios.post(`${process.env.VUE_APP_BACKEND}/login`, {
                "name": this.name,
                "pwd": this.pwd
            }).then((response) => {
                const user_id = response.data;
                console.log("login check", user_id);
                if (user_id == "") {
                    //用户不存在或密码错误
                    this.$notify('用户不存在或密码错误！');
                } else {
                    localStorage.setItem("token", user_id);
                    const path = this.$route.query.redirect || "/";
                    this.$router.push(path);
                }
            });
        },
    }
};
</script>

<style scoped>
.form {
    margin-top: 100px;
}
</style>
