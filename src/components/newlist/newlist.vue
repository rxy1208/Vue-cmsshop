<template>
    <div>
        <!-- 图文列表 -->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
                <router-link :to="'/home/newlistdetail/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <span class="title">{{item.title}}</span>
                        <p class='mui-ellipsis'>
                           <span>发布时间: {{item.add_time | dateToTime()}}</span>
                           <span class="click">点击: {{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                newlist:[]
            }
        },
        created(){
            this.getnewslist();
        },
        methods:{
            getnewslist(){
                this.$http.get('api/getnewslist').then(function(res){
                    if(res.body.status==0){
                        this.newlist=res.body.message;
                    }
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
    .mui-table-view{
        font-size:14px;
        .mui-ellipsis{
            color:blue;
            font-size:13px;
            .click{
                float:right;
            }
        }
        .title{
            font-weight:bold;
        }
    }
</style>