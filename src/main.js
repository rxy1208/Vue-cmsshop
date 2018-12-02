//导入Vue
import Vue from 'vue';

//引入组件
import app from './app.vue';
import vueResource from 'vue-resource';
import moment from 'moment';
// import axios from 'axios';
//引入vant
import { Tab,Tabs } from 'vant';
//引入路由
import router from '../router/router.js';
//引入vant样式
import 'vant/lib/index.css';
//引入vuex
import Vuex from 'vuex';

//改写vue的原型属性
// Vue.prototype.$ajax = axios;

//安装vuex到vue身上
Vue.use(Vuex);

//安装到vue身上
Vue.use(vueResource);
// Vue.use(axios);
Vue.use(Tab).use(Tabs);

//使用过滤器过滤时间
Vue.filter('dateToTime',function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern);
})

//设置全局域名
Vue.http.options.root = 'http://127.0.0.1:3001/';

//按需引入mint-ui
import { Header,Swipe,SwipeItem,Button,Lazyload,Switch  } from 'mint-ui';
//引入mint-ui的样式
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
Vue.component(Switch.name, Switch);

//引入mui样式
import './lib/mui/css/mui.min.css';
//引入mui扩展的字体文件
import './lib/mui/css/icons-extra.css';

//去除本地存储的数据
var cartData = JSON.parse(localStorage.getItem('cartData') || '[]');

//实例化Vuex实现组件的数据共享
var store = new Vuex.Store({
    //共享的数据
    state:{
        cartData:cartData
    },
    //共享数据的修改,使用this.$store.commit('方法名','唯一参数')修改数据
    mutations:{
        //定义添加购物车商品数据到state.cartData
        add(state,data){
            //默认是没有相同商品
            var flag = false;
            state.cartData.forEach(function(item,index){
                //如果有相同商品,则加上数量
                if(item.id==data.id){
                    item.number = parseInt(data.number) + parseInt(item.number);
                    flag = true;
                }
            });
            //没有相同则直接添加
            if(flag == false){
                state.cartData.push(data);
            }
            //存储到本地
            localStorage.setItem('cartData',JSON.stringify(state.cartData));
        },
        //修改商品选中状态
        changeSelected(state,obj){
            state.cartData.forEach(function(item,index){
                if(item.id == obj.id){
                    item.selected = obj.selected;
                }
            });
            //更新本地存储
            localStorage.setItem('cartData',JSON.stringify(state.cartData));
        },
        //修改商品数量
        changeNumber(state,obj){
            state.cartData.forEach(function(item,index){
                if(item.id == obj.id){
                    item.number = obj.number;
                }
            });
            //更新到本地存储
            localStorage.setItem('cartData',JSON.stringify(state.cartData));
        },
        //删除商品
        delCartGoods(state,id){
            state.cartData.forEach(function(item,index){
                if(item.id == id){
                    state.cartData.splice(index,1);
                }
                //保存到本地存储
                localStorage.setItem('cartData',JSON.stringify(state.cartData));
            });
        }

    },
    //向外输出数据
    getters:{
        //获取购物车商品总数
        getTotalNumber(state){
            //初始化总数为0
            var totalNumber = 0;
            //遍历共享数据cartData
            state.cartData.forEach(function(item,index){
                totalNumber += parseInt(item.number);
            });
            //输出数据
            return totalNumber;
        },
        //获取购物车商品id字符串
        getGoodsIds(state){
            var ids = [];
            state.cartData.forEach(function(item,index){
                ids.push(item.id);
            });
            //变成字符串
            return ids.join(',');
        },
        //获取购物车商品的数量,构建对象{商品id : 商品数量}
        getGoodsNum(state){
            var obj={};
            state.cartData.forEach(function(item,index){
                obj[item.id] = item.number;
            });
            return obj;
        },
        //获取商品选中状态 {商品id : 选中状态}
        getGoodsStatus(state){
            var obj = {};
            state.cartData.forEach(function(item,index){
                console.log(item.selected)
                obj[item.id] = item.selected;
            });
            return obj;
        },
        //获取购物车商品总数量和总价格
        getGoodsTotal(state){
            var obj = {
                totalNumber : 0,
                totalPrice : 0
            }
            state.cartData.forEach(function(item,index){
                //判断是否选中
                if(item.selected == true){
                    obj['totalNumber'] += parseInt(item.number);
                    obj['totalPrice'] += parseInt(item.price)*parseInt(item.number);
                }
            });
            return obj;
        }
    }
});


//创建vue实例对象
new Vue({
    el:'#app',
    data:{

    },
    //路由对象挂载到vue实例身上
    router,
    //共享数据仓库挂载到vue实例身上
    store,
    render:(createElement)=>{ return createElement(app)}
});

