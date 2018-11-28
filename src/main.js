//导入Vue
import Vue from 'vue';

//引入组件
import app from './app.vue';
import vueResource from 'vue-resource';
import moment from 'moment';
//引入vant
import { Tab,Tabs } from 'vant';
//引入路由
import router from '../router/router.js';
//引入vant样式
import 'vant/lib/index.css';

//安装到vue身上
Vue.use(vueResource);
Vue.use(Tab).use(Tabs);

//使用过滤器过滤时间
Vue.filter('dateToTime',function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern);
})

//设置全局域名
Vue.http.options.root = 'http://127.0.0.1:3001/';

//按需引入mint-ui
import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui';
//引入mint-ui的样式
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);

//引入mui样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';


//创建vue实例对象
new Vue({
    el:'#app',
    data:{

    },
    router,
    render:(createElement)=>{ return createElement(app)}
});