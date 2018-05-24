<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
      <keep-alive>
        <router-view  :seller="seller"></router-view>
      </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header'
import {urlParse} from '@/api/util';
const ERR_OK = 0;
export default {
  name: 'App',
  data(){
      return {
        seller:{
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
  },
  mounted(){
    this.initSeller()
  },
  components:{
      'v-header':header
    },
  methods:{
    initSeller() {
      this.$axios.get('/api/seller').then((response) => {
         response = response.data;
          if(response.errno===ERR_OK){
            this.seller = response.data;
            console.log(this.seller.id)
          }
        }).catch( err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
@import '../static/css/reset.css';
</style>

<style lang="less">
@import './common/less/index.less';
.tab{
    width: 100%;
    height: 80px;
    line-height: 80px;
    .border-1px(rgba(7,17,27,0.1));
    .tab-item{
      width: 33.33%;
      float: left;
      text-align: center;
    }
    a{
      font-size: 28px;/*px*/
      line-height:28px;/*px*/
      color: rgb(77,85,93);
      text-decoration: none;
      &.active{
      color:rgb(240,20,20);
      }
    }
    &.active{
      color: rgb(240,20,20);
    }
}
</style>
