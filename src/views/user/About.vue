<template>
<div class="about">
    <van-nav-bar title="关于" right-text="点赞" class="navbar" />
    <van-cell value="" center is-link to="/userinfo">
        <template #default>
            <van-row>
                <van-col span="4">
                    <van-image radius="10px" width="60px" height="60px" :src="avatar" />
                </van-col>
                <van-col span="18" offset="2">
                    <font size="5">{{user.nickname}}</font>
                    <div class="brief">{{user.brief}}</div>
                </van-col>
            </van-row>
        </template>
    </van-cell>
    <div class="info">
        这是元芳一边学习Vue3.0一边开发的一个小程序（后面也会开发小程序版本）。<br>有一个明确的目标，碰到问题解决问题，却是最有效的学习代码的方法。<br>后端用Koa+mongodb，前端用vue3.0+vant。 源码：<a href="https://github.com/iyuanfang/vant_study">github</a></div>
    <van-cell-group>
        <van-cell title="关于作者" is-link @click="showAuthor" />
        <van-cell title="注销" is-link @click="logout" />
    </van-cell-group>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
        <div class="info">元芳，算是互联网老人，原来一直做java后端，后来转业务和管理。<br>对前端的发展很感兴趣，所以躬身入局，自己边做边学。<br>微信:pesome</div>
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
            this.avatar = `${process.env.VUE_APP_STATIC}/avatar/${this.user.avatar}`;
        })

    }
};
</script>

<style>
.about {
    background-color: #EEEEEE;
}

.navbar {
    background-color: white;
}

.brief {
    margin-top: 10px;
}

.info {
    background-color: white;
    padding: 20px;
    text-align: left;
    line-height: 150%;
}
</style>
