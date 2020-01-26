import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import axios from 'axios';

export default new Vuex.Store({
  state: {
    imgIdx: 0,
    slidList: [],
    isLoad: true,
    timer: null,
  },
  mutations: {
    setImgData(state, arr){
      state.slidList = arr;
    },
    handTimer(state){
      state.timer = setInterval(()=>{
          state.imgIdx ++;
          if(state.imgIdx > state.slidList.length - 1){
            state.imgIdx = 0;
          }
      }, 3000);
    },
    handCloseTimer(state){
      clearInterval(state.timer);
    },
    setLoadState(state, bool){
      state.isLoad = bool;
    },
    setImgIdx(state, idx){
      state.imgIdx = idx;
    }
  },
  actions: {
    getImgData({dispatch, commit}){
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
                        commit('setLoadState', false);
                    }
                }
            })
            commit('setImgData', arr);
            dispatch('handTimer');
        })
        .catch(err=> {
            console.log(err);
        })
    },
    handTimer({commit}){
      commit('handTimer');
    },
    changeImgIdx({dispatch, commit}, idx){
      commit('setImgIdx', idx);
      dispatch('handCloseTimer');
      dispatch('handTimer');
    },
    handCloseTimer({commit}){
      commit('handCloseTimer');
    }
  },
  getters: {
    slidList: state => {
      return state.slidList;
    },
    imgSrc: state =>{
      return state.slidList[state.imgIdx];
    },
    isLoad: state=>{
      return state.isLoad;
    },
    imgIdx: state=>{
      return state.imgIdx;
    }
  }
})
