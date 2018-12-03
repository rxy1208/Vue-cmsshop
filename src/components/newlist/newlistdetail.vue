<template>
    <div class="mui-content-padded">
        <div>
            <h3 class="title">{{detail.title}}</h3>
            <p class="subtitle">
                <span>发布日期: {{detail.add_time | dateToTime()}}</span>
                <span class="click">点击: {{detail.click}}</span>
            </p>
            <p class="img">
                <img :src="detail.img_url" data-preview-src="" data-preview-group="1" />
            </p>
            <p class="content" v-html="detail.content"></p>
        </div>
        <!-- 评论区域 -->
        
        <comment :id="id"></comment>
    </div>
</template>

<script>
    //引入公共的comment组件
    import comment from '../common/comment.vue';
    export default {
        data(){
            return{
                detail:[],
                id:this.$route.params.id,
            }
        },
        created(){
            // 初始化获得新闻数据
            this.getnew();
            
        },
        methods:{
            //获取文章详情数据
            getnew(){
                this.$http.get('api/getnew/'+this.id).then(function(res){
                    if(res.body.status==0){
                        this.detail = res.body.message[0];
                    }
                })
            },
            
        },
        //注册组件
        components:{
            comment,
        },

    }
</script>

<style lang="sass">
    .mui-content-padded{
        .img{
            img{
                width:100%;
            }
        }

        .content{
            width:100%;
        }

        .subtitle{
            color:blue;
            .click{
                float:right;
            }
        }
        img{
            width:100%;
        }
        
    }
</style>