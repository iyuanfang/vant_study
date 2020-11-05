<template>
<div class="about">
    <van-nav-bar title="关于" right-text="点赞" class="navbar" />
    <van-cell value="" center is-link to="/user_info">
        <template #title>
            <van-row class="row">
                <van-col span="8">
                    <van-image round width="60px" height="60px" :src="avatar" />
                </van-col>
                <van-col span="12" offset="4">
                    <font size="5">{{user.name}}</font><br>{{user.brief}}
                </van-col>
            </van-row>
        </template>
    </van-cell>
    <div class="info">
        Vant 是有赞前端团队开源的移动端组件库，于 2016 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。
    </div>
    <van-cell-group>
        <van-cell title="设置" is-link />
        <van-cell title="关于作者" is-link @click="showAuthor" />
        <van-cell title="注销" is-link @click="logout" />
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
        logout() {
            this.$dialog.confirm({
                    title: '注销',
                    message: '确定要注销吗？',
                })
                .then(() => {
                    localStorage.removeItem("token");
                    this.$router.push("/");
                })
                .catch(() => {
                    // on cancel
                });
        }
    },
    mounted() {
        let user_id = localStorage.getItem("token");
        this.axios.get(`${process.env.VUE_APP_BACKEND}/user/${user_id}`).then((response) => {
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

.row {
    background-color: white;
}

.navbar {
    background-color: white;
}

.info {
    margin: 10px 0;
    background-color: white;
    padding: 20px;
    text-align: left;
}
</style>
