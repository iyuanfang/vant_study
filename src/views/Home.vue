<template>
<div class="home">
    <van-nav-bar title="首页" right-text="下拉刷新" fixed class="navbar" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="list">
            <van-row v-for="item of list" :key="item.id" class="row">
                <van-col span="24">
                    <van-image :src="require('../assets/fengjing.jpg')" />
                    <div class="content">
                        <div class="van-multi-ellipsis--l3">{{item.content}}</div>
                        <van-row class="view">
                            <van-col span="4">
                                <van-icon name="star-o" size="15" />收藏
                            </van-col>
                            <van-col span="4" offset="1">
                                <van-icon name="share-o" size="15" />转发
                            </van-col>
                            <van-col span="4" offset="6">
                                <van-icon name="like-o" size="15" />1024
                            </van-col>
                            <van-col span="4" offset="1">
                                <van-icon name="comment-o" size="15" />100
                            </van-col>
                        </van-row>
                    </div>
                </van-col>
            </van-row>
        </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            refreshing: false
        };
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }

                for (let i = 0; i < 3; i++) {
                    let id = this.list.length; //当前值
                    let content = "Hello，this is yuanfang:" + id;

                    this.list.push({
                        id: id,
                        content: content
                    });
                }
                this.loading = false;

                if (this.list.length >= 100) {
                    this.finished = true;
                }
            }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        }
    }
};
</script>

<style>
.home {
    background-color: #EEEEEE;
}

.row {
    margin-bottom: 10px;
    background-color: white;
}

.van-multi-ellipsis--l3 {
    margin: 10px 0;
}

.content {
    padding: 0 10px 10px 10px;
}

.view {
    font-size: medium;
}
</style>
