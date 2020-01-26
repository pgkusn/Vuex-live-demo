<script>
import axios from 'axios';
import LoadinPage from "./components/LoadinPage.vue";
import ShowImg from './components/ShowImg.vue'
import NavBar from './components/NavBar.vue'
export default {
    name: 'app',
    components:{
        LoadinPage,
        ShowImg,
        NavBar,
    },
    computed: {
        isLoad(){
            return this.$store.getters.isLoad;
        }
    },
    mounted() {
        this.$store.dispatch('getImgData');
    },
    destroyed(){
        this.$store.dispatch('handCloseTimer');
    }
}
</script>
<template>
  <div id="app">
    <show-img></show-img>
    <nav-bar></nav-bar>
    <LoadinPage v-show="isLoad" />
  </div>
</template>

<style lang="scss">
    html{
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #40c297;
        background-color: #233245;
    }
    body{
        line-height: 30px;
    }
    #app{
        text-align: center;
    }
</style>
