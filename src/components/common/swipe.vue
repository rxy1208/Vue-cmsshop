<template>
    <div>
         <!-- 轮播图 -->
        <mt-swipe :auto="2000" >
            <mt-swipe-item  v-for="item in lunbo" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:['lunbo'],
    }
</script>

<style lang="sass" scoped>
    .mint-swipe {
      height: 240px;
      .mint-swipe-item{
        text-align: center;
      }
      img {
        // width: 100%;
        height: 100%;
      }
    }
</style>