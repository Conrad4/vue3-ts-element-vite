<template>
    <div>
        <m-chooseIcon title="选择图标" v-model:visible="visible">
            <!-- 主要按钮里面的插槽 文字 -->
            选择图标
        </m-chooseIcon>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

let visible = ref<boolean>(false);
</script>

<style lang="scss" scoped>
</style>