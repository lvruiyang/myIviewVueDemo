<template>
	<div id="header">
    <div id="content-wrapper">
      <div class="seller-logo">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="seller-description">
        <div class="desc-items">
          <span class="brand"></span>
          <span class="seller-name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description + ' / ' + seller.deliveryTime + '分钟送达'}}</div>
        <div class="dicount" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="supprots-count" v-if="seller.supports" @click="showDetails()">
          {{seller.supports.length+"个"}}
          <i class="icon-keyboard_arrow_right"></i></div>
        </div>
    </div>
    <div class="notice"  @click="showDetails()">
      <span class="icon-notice"></span>
      <span class="notice-text">{{seller.bulletin}}</span>
       <i class="icon-keyboard_arrow_right"></i>
    </div>
	    <!-- 背景图像，使用了filter:blur(10px)虚化了 -->
	    <div class="background">
	      <img :src="seller.avatar" width="100%" height="100%"/>
	    </div>
        <!-- 弹出详情页 -->
        <transition name="fade">
          <div id="seller-detail" v-show="detailShow">
            <div class="detais-name">{{seller.name}}</div>
            <div class="starWrapper">
              <star :score="seller.score" :size="36"></star>
            </div>
            <div class="discount-info">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="supports">
              <div class="supports-items" v-for="sup in seller.supports">
                <span class="supports-icon" :class="classMap[sup.type]"></span>
                <span class="supports-text">{{sup.description}}</span>
              </div>
            </div>
            <div class="discount-info">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="seller-notice">
              {{seller.bulletin}}
            </div>
            <div id="detail-close">
              <i class="icon-close"  @click="hideDetails()"></i>
            </div>
          </div>
        </transition>
	</div>
</template>
<script>
import star from '@/components/common/star'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetails() {
      this.detailShow = true;
    },
    hideDetails() {
      this.detailShow = false;
    }
  }
}

</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
@fontColor:rgb(255,255,255);
#header {
    position: relative;
    background: rgba(7,17,27,0.5);
    color: #fff;
    overflow: hidden;
}
.background{
  filter:blur(10px);
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  z-index:-1;
}
#content-wrapper{
  display:flex;
  padding: 48px 24px 36px 48px;
  .seller-logo{
    width:128px;
    height: 128px;
  }
  .seller-description{
    flex:1;
    position:relative;
    padding-left:32px;
    .desc-items{
      margin: 4px auto 16px auto;
      .brand{
         display:inline-block;
          vertical-align:top;
          width: 66px;
          height: 38px;
          .bg-image('brand');
      }
      .seller-name{
        font-size:32px;/*px*/
        color:@fontColor;
        font-weight:bold;
        line-height:36px;
        margin-left:12px;
      }
    }
    .description{
      font-size:24px;/*px*/
      color:@fontColor;
      font-weight:200;
      line-height:24px;
    }
    .dicount{
      margin-top:20px;
      .icon{
        display:inline-block;
        vertical-align: top;
        width:24px;
        height: 24px;
        margin-right: 8px;
        &.decrease{
          .bg-image('decrease_1');
        }
        &.discount{
          .bg-image('discount_1');
        }
        &.guarantee{
          .bg-image('guarantee_1');
        }
        &.invoice{
          .bg-image('invoice_1');
        }
        &.special{
          .bg-image('special_1');
        }
      }
    }

    .supprots-count{
      font-size:20px;/*px*/
      color:@fontColor;
      font-weight:200;
      line-height:24px;
      background-color:rgba(0,0,0,.2);
      border-radius:30px;
      position:absolute;
      right:24px;
      bottom:0px;
      padding:14px 16px;
      text-align: center;
      .icon-keyboard_arrow_right{
        font-size: 24px;/*px*/
        vertical-align: text-bottom;
      }
    }
  }
}
.notice{
    background-color:rgba(7,17,27,.2);
    color:@fontColor;
    font-size:20px;
    height:56px;
    padding-left:24px; 
    padding-right:24px; 
    line-height:56px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    .icon-notice{
      display:inline-block;
      width:45px;
      height: 24px;
      .bg-image('bulletin');
      vertical-align: text-top;
    }
    .notice-text{
      margin:auto 8px;
    }
    .icon-keyboard_arrow_right{
        font-size: 24px;/*px*/
        vertical-align: text-bottom;
      }
  }
img{
  max-width:100%;
}
#seller-detail{
  position:fixed;
  top:0;
  left: 0;
  width:100vw;
  height: 100vh;
  color:@fontColor;
  z-index:60;
  background-color:rgba(7,17,27,.8);
  backdrop-filter: blur(10px);
  &.fade-enter-active,&.fade-leave-active{
      transition: opacity .5s
  }
  &.fade-enter,&.fade-leave-active{
    opacity:0;
  }
  .detais-name{
    margin-top: 128px;
    font-size: 32px;
    font-weight: 700;
    line-height: 32px;
    text-align: center;
  }
  .starWrapper{
    width:50%;
    height: 48px;
    margin:32px auto auto auto;
  }
  .discount-info{
    display:flex;
    width: 80%;
    margin: 56px auto auto auto;
    .line{
      display: inline-block;
      flex: 1;
      height: 2px;/*no*/
      background: rgba(255,255,255,0.2);
      margin: auto;
    }
    .text{
      font-size: 28px;/*px*/
      font-weight: 700;
      line-height: 28px;
      color:@fontColor;
      padding: 0 12px;
    }
  }
  .supports{
    margin-top: 48px;
    padding-left:72px;
    text-align:left;
     .supports-items{
      margin-bottom:24px;
      height: 32px;
      .supports-text{
        font-size: 24px;/*px*/
        font-weight: 200;
        color:@fontColor;
        line-height:32px;
      }
      .supports-icon{
        width:32px;
        height: 32px;
        display:inline-block;
        vertical-align: top;
        margin-right:12px;
        &.decrease{
          .bg-image('decrease_2');
        }
        &.discount{
          .bg-image('discount_2');
        }
        &.guarantee{
          .bg-image('guarantee_2');
        }
        &.invoice{
          .bg-image('invoice_2');
        }
        &.special{
          .bg-image('special_2');
        }
      }
     }
  }
  .seller-notice{
    width:80%;
    font-size: 24px;
    font-weight: 200;
    line-height: 48px;
    padding:48px 24px;
    text-align: justify;
    color:@fontColor;
    margin: 0 auto;
  }
  #detail-close{
    position:absolute;
    font-size:64px;/*px*/
    color:rgba(255,255,255,.5);
    bottom:64px;
    width:64px;
    height: 64px;
    left: 0;
    right: 0;
    margin:auto;
  }
}
</style>
