<template>
<van-nav-bar title="新的回忆">
    <template #right>
        <van-button size="small" :disabled="disabled" :type="type" @click="save">新增</van-button>
    </template>
</van-nav-bar>
<van-field type="textarea" placeholder="这一刻的想法..." rows="2" autosize v-model="message" />
<van-uploader v-model="files" />
<van-field label="城市" />
</template>
