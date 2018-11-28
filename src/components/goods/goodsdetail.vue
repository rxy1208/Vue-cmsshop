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
                            <input id="test" class="mui-input-numbox" type="number" value="5" />
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mui-card-footer buybutton">
                <mt-button type="primary">立即购买</mt-button>
                <mt-button type="danger">加入购物车</mt-button>
            </div>
        </div>
        
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号: {{goodsinfo.goods_no}}</p>
                    <p>库存情况: {{goodsinfo.stock_quantity}}</p>
                    <p>上架时间: {{goodsinfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <a class="mui-card-link">Like</a>
                <a class="mui-card-link">Read more</a>
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
        components:{
            lunbo,
        },
        methods:{
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
            getgoodsinfo(){
                this.$http.get('api/getgoodsinfo/'+this.id).then(function(res){
                    if(res.body.status==0){
                        this.goodsinfo = res.body.message[0];
                    }
                });
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
        margin-left:10px
    }
</style>