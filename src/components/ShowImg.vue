<script>
export default {
    computed: {
        imgSrc () {
            return this.$store.getters.imgSrc;
        },
        isLoad(){
            return this.$store.getters.isLoad;
        }
    }
};

</script>

<template>
    <div class="mid">
        <img v-show="!isLoad" :src="imgSrc">
    </div>
</template>

<style lang='scss' scoped>
    img{
        border-radius: 50%;
        margin-bottom: 20px;
    }
</style>
