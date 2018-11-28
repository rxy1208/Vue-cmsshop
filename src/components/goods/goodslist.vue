<template>
    <div class="list">
        <router-link :to="'/home/goodsdetail/'+item.id" tag="div" class="goodsmes" v-for="item in getgoodslist" :key="item.id">
            <img v-lazy="item.img_url">
            <h3>{{item.title}}</h3>
            <div class="content">
                <p>
                    <span class="market_price">￥ {{item.market_price}}</span>
                    <span class="sell_price">￥ {{item.sell_price}}</span>
                </p>
                <div class="hot">
                    <span>热卖中</span>
                    <span>剩 {{item.stock_quantity}} 件</span>
                </div>
            </div>
        </router-link>
        <mt-button class="more" type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';    
    export default {
        data(){
            return {
                pageindex:1,
                getgoodslist:[],
            }
        },
        created(){
            this.getgoods();
        },
        methods:{
            //获取订单列表信息
            getgoods(){
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(function(res){
                    if(res.body.message.length==0){
                        Toast('没有更多了');
                    }else{
                        this.getgoodslist = this.getgoodslist.concat(res.body.message);
                    }
                });
            },
            //加载更多
            getMore(){
                //页码加1
                this.pageindex ++;
                //重新加载
                this.getgoods();
            }
        }
    }
</script>

<style lang="sass" scoped>
    .list{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        .more{
            margin:0px 10px 10px 10px;
        }
        .goodsmes{
            width:45%;
            box-shadow:0 0 6px #ccc;
            margin:10px;
            padding:3px;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            
            img{
                width:100%;
            }
            h3{
                font-size:16px;
                text-align:left;
                color:black;
            }
            .content{
                background-color:rgba(9,9,9,0.1);
                p{
                    span{
                        margin:0 4px
                    }
                    .market_price{
                        color:red;
                        font-weight:bold;
                    }
                    .sell_price{
                        text-decoration:line-through;
                    }
                }
                .hot{
                    color:#888;
                    display:flex;
                    justify-content:space-between;
                    span{
                        margin:0 4px;
                    }
                }
            }
        }
    }
</style>