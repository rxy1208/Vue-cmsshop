<template>
    <div class="cart">
		<!-- 明细栏 -->
        <div class="mui-card" v-for="(item,index) in getcartlist" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner cartdetail">
					<!-- <mt-switch v-model="$store.getters.getGoodsStatus[item.id]" @change="changeStatus(item.id,$store.getters.getGoodsStatus[item.id])"></mt-switch> -->
					<mt-switch v-model="$store.getters.getGoodsStatus[item.id]" @change="changeStatus(item.id,$store.getters.getGoodsStatus[item.id])"></mt-switch>
					<img :src="item.thumb_path" alt="">
					<div class="content">
						<h3 class="title">{{item.title}}</h3>
						<div class="number">
							<span class="price">￥{{item.sell_price}}</span>
							<cartnumbox class="numbox" :number="$store.getters.getGoodsNum[item.id]" :id="item.id"></cartnumbox>
							<a href="#" @click.prevent="delCartGoods(item.id,index)">删除</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 总合计结算栏 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner carttotal">
					<div class="freight">
						<span>总计(不含运费)</span>
						<div>已勾选商品<span class="number">{{$store.getters.getGoodsTotal.totalNumber}}</span>件 , 总价 <span class="price">￥{{$store.getters.getGoodsTotal.totalPrice}}</span></div>
					</div>
					<div>
						<mt-button type="danger">结算</mt-button>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
	import cartnumbox from '../common/cartnumbox.vue';
    export default {
        data(){
			return{
				getcartlist:[],
				// flag:true
			}
		},
		created(){
			this.getgoodslist();
		},
		methods:{
			//获取购物车商品列表数据
			getgoodslist(){
				var ids = this.$store.getters.getGoodsIds;
				//如果购物车没有数据，则不发生ajax请求
				if(ids == ''){
					return;
				}
				// console.log(ids);
				this.$http.get('api/getshopcarlist/'+ids).then(function(res){
					if(res.body.status==0){
						this.getcartlist = res.body.message;
					}
				});
			},
			//监控商品选中状态的改变
			changeStatus(id,selected){
				console.log(id,selected);
				//调用motations中的方法,修改商品选中状态
				this.$store.commit('changeSelected',{id:id,selected:selected});
			},
			//删除购物车商品
			delCartGoods(id,index){
				//删除选中商品
				this.getcartlist.splice(index,1);
				//调用motations中的方法,删除存储的数据
				this.$store.commit('delCartGoods',id);
			}

		},
		components:{
			cartnumbox,
		}
    }
</script>

<style lang="sass" scoped>
	.cart{
		.carttotal{
			display:flex;
			justify-content:space-between;
			.freight{
				color:#888;
				.number,.price{
					color:red;
					font-weight:bold;
				}
			}
		}
		.cartdetail{
			display:flex;
			img{
				margin-left:10px;
				width:16%;
				height:16%;
			}
			.content{
				margin-left:10px;
				.title{
					font-size:13px;
					text-align:left;
				}
				.number{
					display:flex;
					line-height:35px;
					.numbox{
						margin-left:14px;
					}
					a{
						margin-left:14px;
					}
					.price{
						color:red;
					}
				}
			}
		}
	}
</style>