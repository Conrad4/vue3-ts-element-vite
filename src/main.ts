import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import { toLine } from './utils';
// const app = createApp(App).mount('#app')
const app = createApp(App);

// for (let i in Icons) {
//     console.log((Icons as any)[i]);
//     app.component(i, (Icons as any)[i]);
// }
for (let i in Icons) {
    // 注册全部组件
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i]);
}

// 链式调用
app.use(router).use(ElementPlus)
app.mount('#app')
;
