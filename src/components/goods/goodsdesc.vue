<template>
    <div class="goodsdesc">
        <h3>{{getdata.title}}</h3>
        <hr />
        <div class="goodsimg" v-html="getdata.content"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id:this.$route.params.id,
                getdata:{},
            }
        },
        created(){
            this.getdesc();
        },
        methods:{
            getdesc(){
                this.$http.get('api/getgoodsdesc/'+this.id).then(function(res){
                    if(res.body.status==0){
                        this.getdata = res.body.message[0];
                    }
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
    .goodsdesc{
        .goodsimg{
            /deep/ img{
                width:100%;
                height:100%;
            }
        }
    }

</style>