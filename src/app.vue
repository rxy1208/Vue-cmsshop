<template>
    <div class="app-content" >
		<!-- header头部 -->
        <mt-header fixed title="Vue-cmsshop">
			<span slot="left" v-show="flag">
				<mt-button icon="back" @click="goBack">返回</mt-button>
			</span>
		</mt-header>
		<!-- tabbar匹配的主题内容 -->
        <router-view class="main-content"></router-view>

		<!-- tabbar选项卡 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getTotalNumber}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
    export default {
        data(){
			return {
				flag:false,
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			}
		},
		//使用watch来监控路由对象
		watch:{
			'$route':function(newValue,oldValue){
				console.log(newValue,oldValue);
				if(newValue.path == '/home'){
					this.flag = false;
				}else{
					this.flag =true;
				}
			}
		}
    }
</script>

<style lang="sass" scoped>
    .app-content{
        .main-content{
            padding-top:40px;
            padding-bottom:51px;
        }
    }
</style>