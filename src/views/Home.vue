<template>
<div class="home">
    <van-nav-bar title="首页" right-text="下拉刷新" fixed class="navbar" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item.id" :title="item.title" />
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

                for (let i = 0; i < 10; i++) {
                    let id = this.list.length + 1;
                    let title = "Hello:" + id;
                    this.list.push({
                        id: id,
                        title: title
                    });
                }
                this.loading = false;

                if (this.list.length >= 40) {
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

<style scoped>
.home {
    background-color: #f8f8f8;
}

.navbar {
    background-color: #f8f8f8;
    color: black;
}
</style>
