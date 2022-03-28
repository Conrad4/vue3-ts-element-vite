<template>
    <div>
        <el-button @click="handleClick">
            <!-- 这里是按钮的文字，在这里封装了一层插槽，在views文件，直接写文字 -->
            <slot></slot>
        </el-button>
        <el-dialog :title="title" v-model="dialogVisible">
            <div class="container">
                <div class="item" v-for="(item, index) in Object.keys(ElIcons)" :key="index" @click="clickItem(item)">
                    <div class="text">
                        <component :is="`el-icon-${toLine(item)}`"></component>
                    </div>
                    <div class="icon">{{ item }}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import * as ElIcons from '@element-plus/icons-vue';
import { toLine } from '../../../utils';
import { useCopy } from '../../../hooks/useCopy';

const props = defineProps<{
    // 控制弹出框的标题
    title: string;
    // 控制弹出框的显示
    visible: boolean;
}>();

// 因为这里作为子组件，需要修改父组件的值
const emits = defineEmits(['update:visible']);

let handleClick = () => {
    // 需要修改父组件的数据
    emits('update:visible', !props.visible);
};
// 拷贝一份父组件传过来prop的值
let dialogVisible = ref<boolean>(props.visible);
watch(
    () => props.visible,
    (val) => {
        // 这样写的缺陷在哪里，你这只是在当前组件改了，要在子组件去修改view里面的父组件
        // val = !val;

        /**
         * 这里是在子组件修改父组件的值,但不能写成!val取反，因为组件dialog自己也会改变
         * 这里面注释的代码内容是刚开始没有拷贝dialogVisible
         * */
        // emits('update:visible', !val);
        // emits('update:visible', val);

        dialogVisible.value = val;
    }
);
// 监听组件内部的dialogVisible变化
watch(
    () => dialogVisible.value,
    (val) => {
        emits('update:visible', val);
    }
);

const clickItem = (item: string) => {
    let text = `el-icon-${toLine(item)}`;
    useCopy(text);
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}
.text {
  font-size: 14px;
}
.icon {
  flex: 1;
}
svg {
  width: 2em;
  height: 2em;
}
</style>
