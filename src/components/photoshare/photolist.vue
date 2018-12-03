<template>
    <div>
        <van-tabs class="imglist" v-model="active" @click="getcatimages">
            <van-tab v-for="item in imgcat" :key="item.id" :title="item.title">
                <router-link :to="'/home/photodetail/'+item.id" tag="li" v-for="item in catimages" :key="item.id">
                    <img v-lazy="item.img_url">
                    <div class="content">
                        <div class="title">{{item.title}}</div>
                        <div>{{item.zhaiyao}}</div>
                    </div>
                </router-link>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                imgcat:[],
                active:0,
                catimages:[],
            }
        },
        created(){
          this.getimgcat();  
          this.getcatimages(0,'全部');
        },
        methods:{
            getimgcat(){
                this.$http.get('api/getimgcategory').then(function(res){
                    if(res.body.status==0){
                        this.imgcat = res.body.message;
                        //设置第一个为全部
                        this.imgcat.unshift({id:0,title:'全部'});
                    }
                });
            },
            getcatimages(index, title){
                var catid = this.imgcat.length ==0 ? 0 : this.imgcat[index].id;
                this.$http.get('api/getcatimages/'+catid).then(function(res){
                    if(res.body.status==0){
                        this.catimages = res.body.message;
                    }
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
    .imglist{
        li{
            list-style:none;
            position:relative;
            margin-top:10px;
            padding:0 10px;
            img{
                width:100%;
            }
            .content{
                color:#fff;
                font-size:13px;
                background-color:rgba(0,0,0,0.5);
                margin-right:10px;
                position:absolute;
                bottom:0;
                .title{font-size:14px}
            }
        }
    }
</style>