<template>
    <div class="header">
        <span @click="toggle">
            <el-icon-expand v-if="collapse"></el-icon-expand>
            <el-icon-fold v-else></el-icon-fold>
        </span>
    </div>
</template>

<script lang="ts" setup>
// defineProps传入的是一个泛型
let props = defineProps<{
    collapse: boolean;
}>();

// const props2 = defineProps({
//   title: String,
// })
const emits = defineEmits(['update:collapse']);

const toggle = () => {
    // 需要修改父组件的数据
    emits('update:collapse', !props.collapse);
};
</script>

<style lang="scss" scoped>
.header {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
}
svg {
    width: 1em;
    height: 1em;
}
</style>
