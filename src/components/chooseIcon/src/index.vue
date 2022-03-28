<template>
  <div>
      <el-button @click="handleClick">
          <!-- 这里是按钮的文字，在这里封装了一层插槽，在views文件，直接写文字 -->
          <slot></slot>
      </el-button>
      <el-dialog :title="title" v-model="dialogVisible">
          内容
      </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
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
}
// 拷贝一份父组件传过来prop的值
let dialogVisible = ref<boolean>(props.visible);
watch(() => props.visible, (val) => {
    // 这样写的缺陷在哪里，你这只是在当前组件改了，要在子组件去修改view里面的父组件
    // val = !val;

   /**
    * 这里是在子组件修改父组件的值,但不能写成!val取反，因为组件dialog自己也会改变
    * 这里面注释的代码内容是刚开始没有拷贝dialogVisible
    * */
    // emits('update:visible', !val);
    // emits('update:visible', val);

    dialogVisible.value = val;

})
// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, val => {
    emits('update:visible', val);
})
</script>

<style>

</style>