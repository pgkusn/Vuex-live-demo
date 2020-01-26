<script>
export default {
    computed: {
        slidList () {
            return this.$store.getters.slidList
        },
        imgIdx () {
            return this.$store.getters.imgIdx
        }
    },
    methods:{
        menuActive(idx){
            this.$store.dispatch('changeImgIdx', idx);
        },
    }
};

</script>

<template>
    <nav>
        <a
            v-for="(item, idx) in slidList"
            :key="item.src"
            :class="{active: imgIdx === idx}"
            @click="menuActive(idx)"
        >
        {{idx + 1}}
        </a>
    </nav>
</template>

<style lang='scss' scoped>

    nav{
        text-align: center
    }
    nav > a{
        cursor: pointer;
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50px;
        margin: 5px;
        background-color: white;
        line-height: 30px;
    }
    nav > a.active{
        color: #fff;
        background-color: #40c297;
    }
</style>
