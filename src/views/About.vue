<template>
<div class="about">
    <van-nav-bar title="关于" right-text="点赞" class="navbar" />
    <van-row class="row">
        <van-col span="8">
            <van-image round width="80px" height="80px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-col>
        <van-col span="12" offset="2">
            <font size="5">元芳</font><br><br>一起来学习vant布局
        </van-col>
    </van-row>
    <div class="info">
        Vant 是有赞前端团队开源的移动端组件库，于 2016 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。
    </div>
    <van-cell-group>
        <van-cell title="设置" is-link />
        <van-cell title="关于" is-link />
    </van-cell-group>
</div>
</template>

<style>
.about {
    background-color: #f8f8f8;
}

.navbar {
    background-color: #f8f8f8;
    color: black;
}

.row {
    background-color: white;
    padding: 10px;
}

.info {
    margin: 10px 0;
    background-color: white;
    padding: 20px;
    text-align: left;
}
</style>
