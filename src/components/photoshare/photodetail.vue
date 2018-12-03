<template>
    <div class="photodetail">
        <h3>{{imgdetail.title}}</h3>
        <p class="time">
            <span class="addtime">发布时间: {{imgdetail.add_time | dateToTime()}}</span>
            <span class="click">点击 {{imgdetail.click}} 次</span>
        </p>
        <hr />
        <div class="img" v-for="(item,index) in img" :key="index">
            <img :src="item.src">
        </div>
        <div class="content" v-html="imgdetail.content"></div>
        <comment :id="imgid"></comment>
    </div>
</template>

<script>
    //导入公共的评论组件
    import comment from '../common/comment.vue';
    //导出
    export default {
        data(){
            return {
                imgid:this.$route.params.imgid,
                imgdetail:[],
                img:[],
            }
        },
        created(){
            this.getImgDetail();
            this.getImages();
        },
        methods:{
            getImgDetail(){
                this.$http.get('api/getimageInfo/'+this.imgid).then(function(res){
                    if(res.body.status==0){
                        this.imgdetail = res.body.message[0];
                    }
                });
            },
            getImages(){
                this.$http.get('api/getthumbimages/'+this.imgid).then(function(res){
                    if(res.body.status==0){
                        this.img = res.body.message;
                    }
                });
            }
        },
        components:{
            comment,
        }
    }
</script>

<style lang="sass">
    .photodetail{
        h3{
            color:blue;
            text-align:center;
        }
        .time{
            display:flex;
            justify-content:space-between;
            color:#ccc;
        }
        .img{
            padding: 10px 4px;
            img{
                width:100%;
            }
        }
        .content{
            line-height:30px;
            margin:0 4px;
        }
    }
</style>