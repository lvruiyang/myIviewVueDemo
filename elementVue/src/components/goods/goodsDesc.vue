<template>
	<transition name="details">
		<div id="foodDetails" v-show="showDetails" ref="foodDetailsContainer">
			<div>
				<div class="back" @click="detailsToggle()">
	          		<i class="icon-arrow_lift"></i>
	        	</div>
				<img class="foodImg" :src="food.image" alt="">
				<div class="descHeader">
					<div class="left">
						<p>{{food.name}}</p>
						<p>月售{{food.sellCount}}份 <span style="margin-left:24px;">好评率{{food.rating}}%</span></p>
						<p>
							<label>￥</label><span>{{food.price}}</span>
							<span v-if="food.oldPrice"><label v-if="food.oldPrice">￥</label>{{food.oldPrice}}</span>
						</p>
					</div>
					<div class="right">
						<div id="cartContent">
							<div class="addCartBtn" @click="addToCart($event)" v-show="!food.count">加入购物车</div>
							<cartcontrol v-if="food.count" :food="food"></cartcontrol>
						</div>
					</div>
				</div>
				<div class="foodDesc">
					<p>商品介绍</p>
					<p>{{food.info}}</p>
				</div>
				<div class="food-rate">
					<div class="tabsWrapper">
						<p>商品评价</p>
						<div id="rate-tabs">
							<span class="rate-tab" @click="changeRateType(0)" :class="{active:filterType===0}">全部{{food.ratings.length}}</span>
							<span class="rate-tab"  :class="{active:filterType===1}" @click="changeRateType(1)">推荐{{referCount}}</span>
							<span class="rate-tab"  :class="{active:filterType===2}" @click="changeRateType(2)">吐槽{{food.ratings.length-referCount}}</span>
						</div>
					</div>
					<div class="justComments" @click="justNotEmpty">
						<i class="icon-check_circle" :class="{on:isJustNotEmpty}"></i><span>只看有内容的评价</span>
					</div>
					<div id="rateList">
						<div class="rate-item" v-for="rate in rateArr">
							<div class="rate-user">
								<div>{{rate.rateTime | time}}</div>
								<div>{{rate.username}}<span class="avatar"><img :src="rate.avatar"></span></div>
							</div>
							<div class="rate-content">
								<i class="icon" :class="rate.rateType?'icon-thumb_down':'icon-thumb_up'"></i>
								<span>{{rate.text}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import '../common/filter.js'
import cartcontrol from '@/components/common/cartcontrol'
import BScroll from 'better-scroll'
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showDetails:false,
				isJustNotEmpty:false,
				filterType:0
			}
		},
		components:{
			cartcontrol
		},
		computed:{
			rateArr(){
				return this.food.ratings.filter(data =>{
					if(this.filterType===0){//查全部
						if(!this.isJustNotEmpty || data.text){
							return data;
						}
					}else if(this.filterType===1){//看推荐
						if((!this.isJustNotEmpty || data.text) && (data.rateType===0)){
							return data;
						}
					}else{
						if((!this.isJustNotEmpty || data.text) && (data.rateType===1)){
							return data;
						}
					}
				})
			},
			referCount(){
				let arr=this.food.ratings.filter(data =>{
					if(data.rateType===0){
						return data;
					}
				});
				return arr.length;
			}
		},
		methods:{
			changeRateType(type){
				this.filterType=type
			},
			justNotEmpty(){
				this.isJustNotEmpty = !this.isJustNotEmpty;
			},
			_initScroll(){
				if(!this.detailsScroll){
					this.detailsScroll= new BScroll(this.$refs.foodDetailsContainer, {
				        click: true
				      });
				}else{
					this.detailsScroll.refresh();
				}
				
			},
			detailsToggle(){
				this.showDetails=!this.showDetails;
				if (this.showDetails) {
			        this.$nextTick(() => {
			          this._initScroll()
			        })
			      }
			},
			addToCart(event){
				if (!event._constructed) {
			        return
			      }
				this.$set(this.food,'count',1)
				this.$root.eventHub.$emit('cart.add', event.target)
			}
		}
	}
</script>
<style lang="less" scoped>
	#foodDetails{
			position:fixed;
			top:0;
			left:0;
			bottom:90px;
			width: 100%;
			background-color:#f3f5f7;
			transition: all .4s ease;
			.back{
				position: absolute;
				top:20px;
				left:0px;
				font-size:40px;/*px*/
				color:#fff;
				padding: 40px;
			}
			.foodImg{
				width:100%;
				height: 750px;
			}
			&.details-enter-active,&.details-leave-active{
				transform: translate3d(0, 0, 0);
			}
			&.details-enter,&.details-leave-active{
				transform: translate3d(100%,0, 0);
			}
			.descHeader{
				display: flex;
				padding:36px;
				background-color:#fff;
				&>div{
					flex:1;
				}
				.left{
					text-align:left;
					&>p:nth-child(1){
						font-size:28px;/*px*/
						font-weight:700;
						color:rgb(7,17,27);
						line-height:28px;
					}
					&>p:nth-child(2){
						font-size:20px;/*px*/
						font-weight:700;
						color:rgb(147,153,159);
						line-height:20px;
						margin: 16px auto 36px auto;
					}
					&>p:nth-child(3){
						&>label{
							font-size:20px;/*px*/
							font-weight:normal;
							color:rgb(240,20,20);
						}
						&>span:nth-of-type(1){
							font-size:28px;/*px*/
							font-weight:700;
							color:rgb(240,20,20);
							line-height:48px;
						}
						&>span:nth-of-type(2){
							font-size:20px;/*px*/
							font-weight:normal;
							color:rgb(147,153,159);
							text-decoration: line-through;
						}
					}
				}
				.right{
					position: relative;
					#cartContent{
						position:absolute;
						right:0;
						bottom:0;
						.addCartBtn{
							height: 48px;
							line-height:24px;
							width: 100%;
							border-radius:24px;
							background-color:rgb(0,160,220);
							color:#fff;
							padding:12px 24px;
							font-size:24px;/*px*/
						}
					}
				}
			}
			.foodDesc{
				margin-top:32px; 
				background-color:#fff;
				padding:36px;
				&>p:nth-child(1){
					font-size:28px;/*px*/
					font-weight:700;
					color:rgb(7,17,27);
					line-height:28px;
				}
				&>p:nth-child(2){
					font-size:24px;/*px*/
					font-weight:200;
					color:rgb(77,85,93);
					line-height:48px;
					margin-top:12px; 
				}
			}
			.food-rate{
				margin-top: 32px;
				background-color:#fff;
				&>p:nth-child(1){
					font-size:28px;/*px*/
					font-weight:700;
					color:rgb(7,17,27);
					line-height:28px;
				}
				.tabsWrapper{
					padding:36px 36px 0 36px;
					#rate-tabs{
						display: flex;
						margin-top: 32px;
						padding-bottom:36px;
						border-bottom:1px solid rgba(7,17,27,0.5);/*no*/
						.rate-tab{
							background-color:rgb(0,160,220);
							border-radius:24px;
							color:#fff;
							padding:16px 24px;
							margin-left:16px;
							display: inline-block;
							&:nth-child(1){
								margin-left:0;
							}
							&.active{
								background-color:#00c850;
							}
						}
					}
				}
				.justComments{
					border-bottom:1px solid rgba(7,17,27,0.5);/*no*/
					padding:0 24px;
					color:rgb(147,153,159);
					height: 96px;
					line-height:96px;
					i{
						margin-right:8px;
						font-size:48px;/*px*/
						display: inline-block;
						&.on{
							color: #00c850;
						}
					}
					span{
						font-size:24px;/*px*/
						vertical-align: super;
					}
				}
				#rateList{
					padding: 32px 36px 0px 36px;
					.rate-item{
						border-bottom:1px solid rgba(7,17,27,0.5);/*no*/
						padding-bottom:32px;
						.rate-user{
							font-size:20px;/*px*/
							color: rgb(147,153,159);
							line-height:24px;
							display: flex;
							&>div{
								flex:1;
							}
							&>div:nth-child(1){
								text-align:left;
							}
							&>div:nth-child(2){
								text-align:right;
								.avatar>img{
									width:24px;
									height: 24px;
									margin-left:12px;
									display: inline-block;
									vertical-align: bottom;
								}
							}
						}
						.rate-content{
							margin-top:12px;
							color:rgb(7,17,27);
							font-size:24px;/*px*/
							i{
								color:rgb(147,153,159);
								margin-right: 8px;
								line-height:48px;
							}
						}
					}
				}
			}
		}
		
</style>