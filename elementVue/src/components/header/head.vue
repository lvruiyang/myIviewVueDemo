<template>
	<div id="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span><!-- 商标 -->
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description+ ' / ' + seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports"><!-- 判断商家是否支持折扣 -->
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail"><!-- 绑定点击弹出详情事件 -->
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
	      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
	      <i class="icon-keyboard_arrow_right"></i>
	    </div>
	    <!-- 背景图像，使用了filter:blur(10px)虚化了 -->
	    <div class="background">
	      <img :src="seller.avatar" width="100%" height="100%"/>
	    </div>
		<!-- 详情弹出页面 start-->
	    <transition name="fade">
	      <div class="detail"  v-show="detailShow">
	        <div class="detail-wrapper clearfix">
	          <div class="detail-main">
	            <h1 class="name">{{seller.name}}</h1>
	            <div class="star-wrapper">
	              <!-- <Star :size="48" :score="seller.score"></Star> -->
	            </div>
	            <!-- 优惠信息 start-->
	            <div class="title">
	              <div class="line"></div>
	              <div class="text">优惠信息</div>
	              <div class="line"></div>
	            </div><!-- 优惠信息 end-->

	            <ul v-if="seller.supports" class="supports">
	              <li class="support-item" v-for="(item,index) in seller.supports">
	                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
	                <span class="text">{{seller.supports[index].description}}</span>
	              </li>
	            </ul>
	            <!-- 商家公告 start-->
	            <div class="title">
	              <div class="line"></div>
	              <div class="text">商家公告</div>
	              <div class="line"></div>
	            </div><!-- 商家公告 end-->

	            <div class="bulletin">
	              <div class="content">{{seller.bulletin}}</div>
	            </div>
	          </div>
	        </div>
	        <div class="detail-close" @click="hideDetail">
	          <i class="icon-close"></i>
	        </div>
	      </div>
	    </transition><!-- 详情弹出页面 end-->
	</div>
</template>
<script>
//import star from 'components/star/star'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  // components: {
  //   star
  // },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  }
}

</script>

<style lang="less" scoped>
@import '../../common/less/mixin.less';
.header{
  position:relative;
  background:rgba(7,17,27,0.5);
  color:#fff;
  blur:10px;
  overflow:hidden;
}
  .content-wrapper{
  	position:relative;
    display:flex;
    padding: 24px 12px 18px 24px;
    font-size:12px;
    .avatar{
		img:border-radius 2px;
    }   
    .content{
      margin-left:16px;
      .title{
      	margin:2px 0 8px 0;
        font-size:16px;
        .brand{
          display:inline-block;
          vertical-align:top;
          width:30px;
          height:18px;
          .bg-image('brand');
          background-size:30px 18px;
          background-repeat:no-repeat;
        }
        .name{
          margin-left:6px;
          font-size:16px;
          line-height:18px;
          font-weight:bold;
        }
      }  
      .description{
      	font-size:12px;
        margin-bottom:10px;
      } 
      .supports{
      	.icon{
      		display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease{
              .bg-image("decrease_1");
            }
            &.discount{
              .bg-image("decrease_1");
            }
            &.guarantee{
              .bg-image("decrease_1");
            }
            &.invoice{
              .bg-image("decrease_1");
            }
            &.special{
              .bg-image("decrease_1");
            }
      	}  
        .text{
          	line-height:12px;
            font-size:10px ;
        } 
      }    
    }
  }
</style>
