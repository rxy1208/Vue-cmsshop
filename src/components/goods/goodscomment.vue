<template>
    <div>
        <swipe :id="id"></swipe>
    </div>
</template>

<script>
    import swipe from '../common/comment.vue';
    export default {
        data(){
            return {
                id:this.$route.params.id,
            }
        },
        components:{
            swipe,
        }
    }
</script>
<style scoped>

</style>