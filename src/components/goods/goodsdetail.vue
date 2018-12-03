<template>
    <div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <lunbo :lunbo="lunbo"></lunbo>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        <span class="market">
                            市场价:  {{goodsinfo.market_price}}
                        </span>
                        <span class="sell">
                            本店价:  {{goodsinfo.sell_price}}
                        </span>
                    </p>
                    <div>
                        <span>购买数量: </span>
                        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
                            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                            <input id="test" class="mui-input-numbox" type="number" value="1" ref="number" />
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mui-card-footer buybutton">
                <mt-button type="primary">立即购买</mt-button>
                <mt-button type="danger" @click="addGoodsToCart">加入购物车</mt-button>
            </div>
        </div>
        
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号: {{goodsinfo.goods_no}}</p>
                    <p>库存情况: {{goodsinfo.stock_quantity}}</p>
                    <p>上架时间: {{goodsinfo.add_time | dateToTime()}}</p>
                </div>
            </div>
            <div class="mui-card-footer largebutton">
                <mt-button type="primary" size="large" plain @click="intro">图文介绍</mt-button>
                <mt-button class="comment" type="danger" size="large" plain @click="comment">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    //导入轮播图公共组件
    import lunbo from '../common/swipe.vue';
    //引入mui的js文件
    import mui from "../../lib/mui/js/mui.js";
    console.log(mui);

    export default {
        data(){
            return{
                lunbo:[],
                id:this.$route.params.id,
                goodsinfo:{}
            }
        },
        created(){
            this.getgoodsimg();
            this.getgoodsinfo();
        },
        mounted(){
            mui('.mui-numbox').numbox();
        },
        components:{
            lunbo,
        },
        methods:{
            //获取商品轮播图数据
            getgoodsimg(){
                this.$http.get('api/getthumbimages/'+this.id).then(function(res){
                    if(res.body.message.length==0){
                        //没有图片,显示默认图片
                        res.body.message.push({
                            img:"http://phvbk3pna.bkt.clouddn.com/error.png",
                            url:"http://phvbk3pna.bkt.clouddn.com/error.png"
                        });
                    }else{
                        res.body.message.forEach(ele => {
                            ele.img = ele.src;
                            ele.url = ele.src;
                        });
                    }
                    this.lunbo = res.body.message;
                });
            },
            //获取商品详情
            getgoodsinfo(){
                this.$http.get('api/getgoodsinfo/'+this.id).then(function(res){
                    if(res.body.status==0){
                        this.goodsinfo = res.body.message[0];
                    }
                });
            },
            //获取图文介绍
            intro(){
                this.$router.push('/home/goodsdesc/'+this.id);
            },
            //获取商品评论
            comment(){
                this.$router.push('/home/goodscomment/'+this.id);
            },
            //把商品添加到购物车
            addGoodsToCart(){
                //构建购物车商品数据的对象
                var data = {
                    id:this.id,
                    number:this.$refs.number.value,
                    price:this.goodsinfo.sell_price,
                    selected:true
                };
                //把数据提交到vuex共享中
                this.$store.commit('add',data);
            }
        },
    }
</script>

<style lang="sass" scoped>
    .buybutton{
        diaplay:flex;
        justify-content:flex-start;
        .mint-button--danger{
            margin-left:10px;
        }
    }
    .market{
        text-decoration:line-through;
    }
    .sell{
        color:red;
        font-weight:bold;
        margin-left:10px;
    }
    .largebutton{
        display:flex;
        flex-direction:column;
        .comment{
            margin-top:5px;
        }
    }
</style>