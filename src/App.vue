<script>
import axios from 'axios';
import LoadinPage from "./components/LoadinPage.vue";
export default {
    name: 'app',
    components:{
        LoadinPage
    },
    data(){
        return{
            imgIdx: 0,
            slidList: [],
            timer: null,
            isLoad: true,
        }
    },
    computed:{
        imgSrc(){
            return this.slidList[this.imgIdx];
        }
    }, 
    methods:{
        menuActive(idx){
            this.imgIdx = idx;
            this.handCloseTimer();
            this.handChangeImg();
        },
        handChangeImg(){
            this.timer = setInterval(()=>{
                this.imgIdx ++;
                if(this.imgIdx > this.slidList.length - 1){
                    this.imgIdx = 0;
                }
            }, 3000);
        },
        handCloseTimer(){
            clearInterval(this.timer);
        }
    },
    mounted() {
        let loadingIdx = 0;
        axios.get("/api/show").then(res=> {
            const arr = [];
            res.data.data.forEach(item=>{
                const img = new Image();
                img.src = item.src;
                img.onload = () =>{
                    loadingIdx++;
                    arr.push(img.src);
                    if(loadingIdx === res.data.data.length){
                        this.isLoad = false;
                    }
                }
            })
            this.slidList = arr;
            this.handChangeImg();
        })
        .catch(err=> {
            console.log(err);
        })
    },
    destroyed(){
        this.handCloseTimer();
    }
}
</script>
<template>
  <div id="app">
    <div class="mid">
        <img v-show="!isLoad" :src="imgSrc">
    </div>
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
    img{
        border-radius: 50%;
        margin-bottom: 20px;
    }
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
