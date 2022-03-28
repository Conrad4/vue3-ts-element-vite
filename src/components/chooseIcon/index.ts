import { App } from 'vue'
import chooseIcon from './src/index.vue'

// export default (app: App) => {
//   app.component('chooseIcon', chooseIcon)
// }

export default {
    install: (app: App) => {
        app.component('chooseIcon', chooseIcon)
    }
}