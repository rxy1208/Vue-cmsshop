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
        <div>
            <h3>发表评论</h3>
            <div class="mui-input-row" style="margin: 10px 5px;">
                <textarea id="textarea" rows="5" placeholder="请输入评论内容" v-model="content"></textarea>
            </div>
            <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
            <div class="comment" v-for="(item,index) in comments" :key="index">
                <div class="comment-message">
                    <span>
                        第{{index+1}}楼用户: 匿名用户
                    </span>
                    <span class="time">
                        发布时间: {{item.add_time | dateToTime()}}
                    </span>
                </div>
                <div class="comment-content">
                    {{item.content}}
                </div>
            </div>
            
            <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
        </div>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                detail:[],
                pageindex:1,
                comments:[],
                content:'',
            }
        },
        created(){
            // 初始化获得新闻数据
            this.getnew();
            // 初始化获取评论数据
            this.getComment();
        },
        methods:{
            //获取文章详情数据
            getnew(){
                this.$http.get('api/getnew/'+this.$route.params.id).then(function(res){
                    if(res.body.status==0){
                        this.detail = res.body.message[0];
                    }
                })
            },
            //获取评论数据
            getComment(){
                this.$http.get('api/getcomments/'+this.$route.params.id+'?pageindex='+this.pageindex).then(function(res){
                    if(res.body.status==0){
                        if(res.body.message.length==0){
                            Toast('没有更多了')
                        }
                        //不覆盖
                       
                            this.comments = this.comments.concat(res.body.message);
                        
                    }
                });
            },
            //添加评论
            addComment(){
                if(this.content.trim()==''){
                    Toast('评论内容不能为空');
                    return;
                }
                this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.content},{emulateJSON:true}).then(function(res){
                    if(res.body.status==0){
                        Toast('评论成功');
                        //清空填写内容和评论
                        this.content='';
                        this.comments=[];
                        //重新加载
                        this.getComment();
                    }
                });
            },
            //加载更多
            getMore(){
                //页面加1
                this.pageindex ++;
                //重新加载
                this.getComment();
            }
        }

    }
</script>

<style lang="sass" scoped>
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
        .comment{
            margin:10px 0;
            .comment-message{
                background-color:#ccc;
                font-size:14px;
                .time{float:right}
            }
            .comment-content{
                margin:2px 2px;
            }
        }
    }
</style>