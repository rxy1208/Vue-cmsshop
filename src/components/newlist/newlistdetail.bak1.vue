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

        <div>
            <h3>发表评论</h3>
            <div class="mui-input-row" style="margin: 10px 5px;">
                <textarea id="textarea" rows="5" placeholder="请输入评论内容"></textarea>
            </div>
            <mt-button type="primary" size="large">发表评论</mt-button>
            
        </div>
        <!--下拉刷新容器-->
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
			<div class="mui-scroll">
				<!--数据列表-->
				<ul class="mui-table-view mui-table-view-chevron">
					<div class="comment">
                        <div class="comment-message">
                            <span>
                                第 1 楼用户: 匿名用户
                            </span>
                            <span>
                                发布时间: 2018-7-23
                            </span>
                        </div>
                        <div class="comment-content">
                            阿345125
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-message">
                            <span>
                                第 1 楼用户: 匿名用户
                            </span>
                            <span>
                                发布时间: 2018-7-23
                            </span>
                        </div>
                        <div class="comment-content">
                            阿345125
                        </div>
                    </div>
				</ul>
			</div>
		</div>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js"
    export default {
        data(){
            return{
                detail:[],
                conut:0
            }
        },
        created(){
            this.getnew();
            this.getmore();
        },
        methods:{
            getnew(){
                this.$http.get('api/getnew/'+this.$route.params.id).then(function(res){
                    console.log(res);
                    if(res.body.status==0){
                        this.detail = res.body.message[0];
                    }
                })
            },
            getmore(){
                var _this = this;
                
                mui.init({
                    pullRefresh: {
                        container: '#pullrefresh',
                        up: {
                            contentrefresh: '正在加载...',
                            callback: _this.pullupRefresh(this)
                        }
                    }
                });
                
            },
            pullupRefresh(obj) {
                var _conut = this.conut;
                setTimeout(function() {
                    obj.pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
                    var table = document.body.querySelector('.mui-table-view');
                    var cells = document.body.querySelectorAll('.mui-table-view-cell');
                    for (var i = cells.length, len = i + 20; i < len; i++) {
                        var li = document.createElement('li');
                        li.className = 'mui-table-view-cell';
                        li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
                        table.appendChild(li);
                    }
                }, 1500);
            }
            
        }
    }
    var count = 0;
    /**
     * 上拉加载具体业务实现
     */
    if (mui.os.plus) {
        mui.plusReady(function() {
            setTimeout(function() {
                mui('#pullrefresh').pullRefresh().pullupLoading();
            }, 1000);

        });
    } else {
        mui.ready(function() {
            mui('#pullrefresh').pullRefresh().pullupLoading();
        });
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
            }
            .comment-content{
                margin:2px 2px;
            }
        }
    }
</style>