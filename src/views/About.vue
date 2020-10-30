<template>
<div class="about">
    <van-nav-bar title="关于" right-text="点赞" class="navbar" />
    <van-row class="row">
        <van-col span="5">
            <van-image round width="80px" height="80px" :src="avatar" />
        </van-col>
        <van-col span="17" offset="2">
            <font size="5">{{user.name}}</font><br><br>{{user.brief}}
        </van-col>
    </van-row>
    <div class="info">
        Vant 是有赞前端团队开源的移动端组件库，于 2016 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。
    </div>
    <van-cell-group>
        <van-cell title="设置" is-link />
        <van-cell title="关于作者" is-link @click="showAuthor" />
    </van-cell-group>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
        <div style="padding:20px">元芳做的小页面，欢迎交流.<br>源代码：<a href="https://github.com/iyuanfang/vant_study">github</a></div>
    </van-popup>
</div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            user: {},
            avatar: ""
        };
    },

    methods: {
        showAuthor() {
            this.show = true;
        },
    },
    mounted() {
        this.axios.get(`${process.env.VUE_APP_BACKEND}/user/1`).then((response) => {
            this.user = response.data;
            this.avatar = `${process.env.VUE_APP_STATIC}/img/avatar-${this.user.id}.jpg`;
        })

    }
};
</script>

<style>
.about {
    background-color: #EEEEEE;
}

.navbar {
    background-color: #EEEEEE;
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
