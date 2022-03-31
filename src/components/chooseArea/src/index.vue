<template>
    <div>
        <el-select clearable placeholder="请选择省份" v-model="province">
            <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select clearable :disabled="!province" style="margin: 0 10px" placeholder="请选择城市" v-model="city">
            <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select clearable :disabled="!province || !city" placeholder="请选择区域" v-model="area">
            <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import allAreas from '../lib/pca-code.json';

export interface AreaItem {
    name: string;
    code: string;
    children?: AreaItem[];
}
export interface Data {
    name: string;
    code: string;
}

// 下拉框选择省份的值
let province = ref<string>('');
// 下拉框选择城市的值
let city = ref<string>('');
// 下拉框选择区域的值
let area = ref<string>('');
// 拷贝一份，所有的省市区数据
let areas = ref(allAreas);
// 数组对象
// console.log(allAreas);

// 根据省份的值，拿到对应的城市数据
let selectCity = ref<AreaItem[]>([]);
// 区域下拉框的所有的值
let selectArea = ref<AreaItem[]>([]);
// emits发送事件给父组件啊
const emits = defineEmits(['change']);

watch(
    () => province.value,
    (val) => {
        if (val) {
            let cities = areas.value.find((item) => item.code === val)!.children;
            selectCity.value = cities;
        }

        city.value = '';
    }
);

// 监听选择城市
watch(
    () => city.value,
    (val) => {
        if (val) {
            let area = selectCity.value.find((item) => item.code === city.value)!.children!;
            selectArea.value = area;
        }
        area.value = '';
    }
);

watch(
    () => area.value,
    (val) => {
        if (val) {
            let provinceData: Data = {
                code: province.value,
                name: province.value && allAreas.find((item) => item.code === province.value)!.name,
            };
            let cityData: Data = {
                code: city.value,
                // 这里必须有city.value &&，要写这个连接符条件，要不然直接执行后面的代码，当city为空时会报错
                name: city.value && selectCity.value.find((item) => item.code === city.value)!.name,
            };
            let areaData: Data = {
                code: val,
                name: val && selectArea.value.find((item) => item.code === val)!.name,
            };
            emits('change', {
                province: provinceData,
                city: cityData,
                area: areaData,
            });
        }
    }
);
</script>
<style lang="scss" scoped></style>
