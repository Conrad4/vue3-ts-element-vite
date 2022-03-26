<template>
  <el-container>
    <el-aside width="auto">
      <el-menu :collapse="isCollapse" default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <el-icon-addlocation style="margin-right: 10px"></el-icon-addlocation>
          <span>导航一</span>
        </el-menu-item>
        <el-menu-item index="2">
          <!-- 这种是不行的 -->
          <!-- <i class="el-icon-setting"></i> -->
          <span>导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span>导航三</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggle">
          <el-icon-expand v-if="isCollapse" style="margin-right: 10px"></el-icon-expand>
          <el-icon-fold v-else style="margin-right: 10px"></el-icon-fold>
        </span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

let isCollapse = ref(false);

let toggle = () => {
    isCollapse.value = !isCollapse.value;
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
