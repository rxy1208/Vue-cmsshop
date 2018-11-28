<template>
    <div class="home-content">
        <lunbo :lunbo="lunbo"></lunbo>
        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newlist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></router-link></li>
        </ul> 
        
    </div>
</template>

<script>
    //导入轮播图公共组件
    import lunbo from '../common/swipe.vue';
    export default {
        data(){
            return{
                lunbo:[]
            }
        },
        created(){
            this.getlunbo();
        },
        methods:{
            getlunbo(){
                this.$http.get('api/getlunbo').then(function(res){
                    console.log(res);
                    if(res.body.status == 0){
                        this.lunbo = res.body.message;
                    }
                });
            }
        },
        components:{
            lunbo,
        }
    }
</script>

<style lang="sass" scoped>
    .home-content{
        width:100%;
        height:300px;
        img{
            width:100%;
            height:100%;
        }
        .mui-table-view{
            background-color:#fff;
            .mui-table-view-cell{
                border:none;
                
            }
        }
    }
</style>