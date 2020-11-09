<template>
<router-view />
<van-tabbar route v-show="$route.meta.navShow">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/addmemory" icon="add-o">记录</van-tabbar-item>
    <van-tabbar-item replace to="/about" icon="eye-o">关于</van-tabbar-item>
</van-tabbar>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
}
</style>
