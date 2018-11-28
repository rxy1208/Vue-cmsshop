//导入Vue
import Vue from 'vue';

//引入路由
import VueRouter from 'vue-router';

//引入组件
import home from '../src/components/tabbar/home.vue';
import member from '../src/components/tabbar/member.vue';
import cart from '../src/components/tabbar/cart.vue';
import search from '../src/components/tabbar/search.vue';
import newlist from '../src/components/newlist/newlist.vue';
import newlistdetail from '../src/components/newlist/newlistdetail.vue';
import photolist from '../src/components/photoshare/photolist.vue';
import photodetail from '../src/components/photoshare/photodetail.vue';
import goodslist from '../src/components/goods/goodslist.vue';
import goodsdetail from '../src/components/goods/goodsdetail.vue';

//把路由安装到vue
Vue.use(VueRouter);
//实例话路由对象
var router = new VueRouter({
        routes:[
                {path:'/',redirect:'/home'},
                {path:'/home',component:home},
                {path:'/member',component:member},
                {path:'/cart',component:cart},
                {path:'/search',component:search},
                {path:'/home/newlist',component:newlist},
                {path:'/home/newlistdetail/:id',component:newlistdetail},
                {path:'/home/photolist',component:photolist},
                {path:'/home/photodetail/:imgid',component:photodetail},
                {path:'/home/goodslist/',component:goodslist},
                {path:'/home/goodsdetail/:id',component:goodsdetail},
            ],
        //修改路由默认类
        'linkActiveClass' :  'mui-active'
});

export default   router;
