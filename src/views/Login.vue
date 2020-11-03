<template>
<div>
    <p>用户名：<input type='text' v-model="userName"></p>
    <p>密码：<input type='text' v-model="passWord"></p>
    <button @click="login()">登录</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            userName: 'root',
            passWord: 'root'
        }
    },
    methods: {
        login() {
            const path = this.$route.query.redirect || '/';
            localStorage.setItem("token", "1");
            this.$router.push(path);
        }
    }
}
</script>
