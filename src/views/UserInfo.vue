<template>
<van-nav-bar title="个人信息" left-arrow class="navbar" @click-left="onClickLeft" />
<van-cell-group>
    <van-cell title="头像" is-link />
    <van-cell title="昵称" is-link />
</van-cell-group>
</template>

<script>
export default {

    methods: {
        onClickLeft() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>
.navbar {
    background-color: #EEEEEE;
    color: black;
}
</style>
