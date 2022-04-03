<template>
    <el-tabs>
        <!-- <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
        <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
            <el-scrollbar max-height="300px">
                <div class="container" @click="clickItem(item1, index1)" v-for="(item1, index1) in item.content" :key="index1">
                    <div class="avatar" v-if="item1.avatar">
                        <el-avatar size="small" :src="item1.avatar"></el-avatar>
                    </div>
                    <div class="content">
                        <div v-if="item1.title" class="title">
                            <div>{{ item1.title }}</div>
                            <el-tag v-if="item1.tag" size="mini" :type="item1.tagType">{{ item1.tag }}</el-tag>
                        </div>
                        <div class="time" v-if="item1.desc">{{ item1.desc }}</div>
                        <div class="time" v-if="item1.time">{{ item1.time }}</div>
                    </div>
                </div>
                <div class="actions">
                    <div
                        class="a-item"
                        :class="{ border: i !== actions.length }"
                        v-for="(action, i) in actions"
                        :key="i"
                        @click="clickAction(action, i)"
                    >
                        <div class="a-icon" v-if="action.icon">
                            <component :is="`el-icon-${toLine(action.icon)}`"></component>
                        </div>
                        <div class="a-text">{{ action.text }}</div>
                    </div>
                </div>
            </el-scrollbar>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { PropType } from '@vue/runtime-core';
import { ActionOptions, ListItem, ListOptions } from './types';
import { toLine } from '../../../utils'

const props = defineProps({
    // 列表的内容
    list: {
        type: Array as PropType<ListOptions[]>,
        required: true,
    },

    // 操作的内容
    actions: {
        type: Array as PropType<ActionOptions[]>,
        default: () => [],
    },
});

const emits = defineEmits(['clickItem','clickAction']);
const clickItem = ( item: ListItem, index:number  )=> {
    emits('clickItem',{ item, index });
}
const clickAction = (action: ActionOptions,index: number) => {
    emits('clickAction', {action , index})
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    .avatar {
        flex: 1;
    }
    .content {
        flex: 3;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .time {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
        }
    }
}
</style>
