<template>
<div class="home">
    <van-nav-bar title="首页" right-text="下拉刷新" fixed class="navbar" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="list">
            <van-row v-for="item of list" :key="item._id" class="row">
                <van-col span="24">
                    <div class="imgbox">
                        <van-image :src="item.imgs[0].url" class="img" @click="preview(item.imgs[0].url)" />
                    </div>
                    <div class="content">
                        <div class="van-multi-ellipsis--l3">{{item.story}}</div>
                        <div class="location">
                            <van-icon name="location-o" />{{item.city}}
                        </div>
                        <div class="date">{{this.showtime(item.date)}}</div>
                    </div>
                </van-col>
            </van-row>
        </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
import {
    ImagePreview
} from 'vant';
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
            if (this.refreshing) {
                this.list = [];
                this.refreshing = false;
            }

            const user_id = localStorage.getItem("token");
            const pagesize = 3; //每页3条
            this.axios
                .get(`${process.env.VUE_APP_BACKEND}/memory/user/${user_id}/${pagesize}/${this.list.length}`)
                .then((response) => {
                    const memories = response.data;
                    this.list = this.list.concat(memories);
                    console.log("list:", this.list);
                    //Array.prototype.push.apply(this.list, memories);
                    this.loading = false;
                    if (memories.length < pagesize) {
                        this.finished = true;
                    }
                });
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        preview(url) {
            ImagePreview({
                images: [url], // 预览图片的那个数组
                loop: false,
                startPosition: 0, // 指明预览第几张图
                closeOnPopstate: true,
                closeable: true,
            })
        },
        showtime(date) {
            return new Date(date).toLocaleDateString();
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

.van-pull-refresh {
    margin-top: 40px;
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

.imgbox {
    width: 100%;
    height: 200px;
    margin: 0 0;
}

.img {
    width: 100%;
    height: 200px;
    background-color: #cd0000;
    object-fit: contain;
}

.location {
    font-size: small;
}

.date {
    font-size: small;
    margin-top: 5px;
}
</style>
