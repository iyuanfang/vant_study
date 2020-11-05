<template>
<van-nav-bar title="注册" right-text="登录" @click-right="login" />
<van-form @submit="onSubmit" class="form">
    <van-field v-model="name" ref="name" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" @blur="nameBlur" />
    <van-field v-model="pwd" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
    <van-field v-model="pwd2" type="password" name="密码" label="确认密码" placeholder="确认密码" :rules="[{ required: true, message: '请再次输入密码' }]" />
    <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
            注册
        </van-button>
    </div>
</van-form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            pwd: '',
            pwd2: ''
        };
    },
    methods: {
        login() {
            this.$router.push({
                path: "/login",
                query: {
                    redirect: this.$route.query.redirect
                }
            });
        },
        nameBlur() {
            this.axios.get(`${process.env.VUE_APP_BACKEND}/user/name/${this.name}`).then((response) => {
                if (response.data) {
                    this.$notify("用户名已存在！")
                    this.$refs.name.focus();
                } else {
                    this.$notify({
                        type: 'success',
                        message: '用户名可以注册'
                    })
                }
            })
        },
        onSubmit() {
            if (this.pwd != this.pwd2) {
                this.$notify("两次输入密码不一致！")
                return
            }
            this.axios.post(`${process.env.VUE_APP_BACKEND}/user`, {
                "name": this.name,
                "pwd": this.pwd
            }).then((response) => {
                console.log(response.data);
                const user_id = response.data._id;
                localStorage.setItem("token", user_id);
                const path = this.$route.query.redirect || "/";
                this.$router.push(path);
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
