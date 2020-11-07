<template>
<van-nav-bar title="个人信息" left-arrow class="navbar" @click-left="onClickLeft" />
<van-cell-group>
    <van-cell title="头像" is-link>
        <template #default>
            <van-image radius="10px" width="60px" height="60px" :src="avatar" />
        </template>
    </van-cell>
    <van-cell title="昵称" :value="user.nickname" is-link to="/nickname" />
    <van-cell title="个性签名" :value="user.brief" is-link to="/brief" />
</van-cell-group>
</template>

<script>
export default {
    data() {
        return {
            user: ''
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/about')
        }
    },
    mounted() {
        const user_id = localStorage.getItem("token");
        this.axios
            .get(`${process.env.VUE_APP_BACKEND}/user/${user_id}`)
            .then((response) => {
                this.user = response.data;
                this.avatar = `${process.env.VUE_APP_STATIC}/img/${this.user.avatar}`;
            });
    }
}
</script>

<style>

</style>
