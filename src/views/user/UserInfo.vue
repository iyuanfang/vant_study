<template>
<van-nav-bar title="个人信息" left-arrow class="navbar" @click-left="onClickLeft" />

<van-cell-group>
    <van-uploader :file-list="fileList" accept="image" :after-read="afterRead">
        <van-cell title="头像" is-link>
            <van-image radius="10px" width="60px" height="60px" :src="avatar" />
        </van-cell>
    </van-uploader>
    <van-cell title="昵称" :value="user.nickname" is-link to="/nickname" />
    <van-cell title="个性签名" :value="user.brief" is-link to="/brief" />
</van-cell-group>
</template>

<script>
export default {
    data() {
        return {
            user: '',
            avatar: ''
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/about')
        },
        afterRead(file) {
            let params = new FormData();
            params.append("avatar", file.file);
            const user_id = localStorage.getItem("token");
            this.axios.post(`${process.env.VUE_APP_BACKEND}/avatar/${user_id}`, params).then((response) => {
                this.avatar = `${process.env.VUE_APP_STATIC}/avatar/${response.data}`;
            });
        }
    },
    mounted() {
        const user_id = localStorage.getItem("token");
        this.axios
            .get(`${process.env.VUE_APP_BACKEND}/user/${user_id}`)
            .then((response) => {
                this.user = response.data;
                this.avatar = `${process.env.VUE_APP_STATIC}/avatar/${this.user.avatar}`;
            });
    }
}
</script>

<style>
.van-uploader {
    width: 100%;
}

.van-uploader__input-wrapper {
    width: 100%;
}
</style>
