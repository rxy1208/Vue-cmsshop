<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <!-- 获取商品数量 -->
            <input id="test" class="mui-input-numbox" type="number" ref="number" :value="number" @change="changeNumber()" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
 import mui from '../../lib/mui/js/mui.min.js';
    export default {
        //生命周期
        mounted(){
            //初始化
            mui('.mui-numbox').numbox();
        },
        //接收父组件传递的数据
        props:['number','id'],
        //数量改变触发
        methods:{
            changeNumber(){
                //通过虚拟dom获取对应的值
                var number = this.$refs.number.value;
                //调用mutations中的方法,存储数据到本地
                this.$store.commit('changeNumber',{id:this.id,number:number});
            }
        }
        
    }
</script>

<style scoped>

</style>