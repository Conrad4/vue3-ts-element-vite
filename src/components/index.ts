import { App } from 'vue';
import chooseArea from './chooseArea';
import chooseIcon from './chooseIcon';

const components = [
    chooseArea,
    chooseIcon,
];

export default {
    install(app: App) {
        // 遍历引入组件的数组集合
        components.map((item) => {
            app.use(item);
        });
    },
};
