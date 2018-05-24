<template>
	<div>
		<div id="shoppingCar">
			<div class="carContent"  @click="listToggle">
				<div id="leftContent">
					<div class="carWrapper">
						<div class="icon-content" :class="{selectedActive:isSelected}"><i class="icon-shopping_cart"></i></div>
						<div class="tip" v-show="totalPrice>0">{{goodsCount}}</div>
					</div>
					<div class="price">
						￥{{totalPrice}}
					</div>
					<div class="needPrice">另需要配送费￥4元</div>
				</div>
				<div id="rightContent" :class="{enough:isEnough}">{{textTip}}</div>
			</div>
			<div class="ballsContainer">
				<transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" v-for="ball in balls">
					<div class="balls" v-show="ball.show">
						<div class="inner"></div>
					</div>
				</transition>
			</div>
			<transition name="cartList">
				<div id="cartList" v-show="cartListShow">
					<div class="listHeader">
						<div class="leftContent">购物车</div>
						<div class="rightContent" @click="clearCart">清空</div>
					</div>
					<div class="cartsContent" ref="cartList">
						<ul>
							<li v-for="food in selectedFood">
								<div class="items-name">{{food.name}}</div>
								<div class="items-price">￥{{food.price*food.count}}</div>
								<div class="cartcontrol"><cartcontrol :food="food"></cartcontrol></div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="discover">
			<div id="overlay" v-show="cartListShow" @click="listToggle"></div>
		</transition>
	</div>
	
</template>
<script>
import cartcontrol from '@/components/common/cartcontrol'
import BScroll from 'better-scroll'
	export default{
		name:"shoppingCar",
		props:{
			 selectedFood:{
			 	type:Array
			 },
		    minPrice: {
		      type: Number,
		      default: 0
		    }
		},
		data(){
			return {
				balls: [{
			        show: false
			      }, {
			        show: false
			      }, {
			        show: false
			      }, {
			        show: false
			      }, {
			        show: false
			      }],
			      dropBalls: [],
			      cartListShow:false,
			      totalPrice:0,
			      isEnough:false
			}
		},
		created() {
		    this.$root.eventHub.$on('cart.add', this.drop);
		  },
		  computed:{
		  	textTip(){
		  		let left =this.minPrice -this.totalPrice;
		  		this.isEnough=false;
		  		if(this.totalPrice===0){
		  			return `￥${this.minPrice}起送`;
		  		}else{
		  			if(left>0){
		  				return `还差${left}元起送`;
		  			}else{
		  				this.isEnough=true;
		  				return `去结算`;
		  			}
		  		}
		  	},
		  	isSelected(){
		  		return this.selectedFood.length>0;
		  	},
		  	goodsCount(){
		  		let count=0;
		  		this.totalPrice=0;
		  		this.selectedFood.forEach((good)=>{
		  			count+=good.count;
		  			this.totalPrice+=good.count*good.price;
		  		})
		  		if(!count){
		  			this.cartListShow=false;
		  		}
		  		return count;
		  	}
		  },
		methods:{
			clearCart(){
				this.selectedFood.forEach((food)=>{
					food.count=0;
				})
			},
			drop(el){
				for(let i = 0,len= this.balls.length;i < len;i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
					}
				}
			},
			beforeEnter(el){
				let count = this.dropBalls.length;
				while(count--){
					let ball = this.dropBalls[count];
					if(ball.show){
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left-90;
						let y = -(window.innerHeight - rect.top - 80);
						el.style.display = ''
			          	el.style.webkitTransform = `translate3d(0,${y}px,0)`
			          	el.style.transform = `translate3d(0,${y}px,0)`
			          	let inner = el.querySelector('.inner')
			          	inner.style.webkitTransform = `translate3d(${x}px,0,0)`
			          	inner.style.transform = `translate3d(${x}px,0,0)`
					}
				}
				
			},
			enter(el){
				el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发,等数据变化了再进行动画
		      	this.$nextTick(() => {
		        	el.style.webkitTransform = 'translate3d(0,0,0)'
		        	el.style.transform = 'translate3d(0,0,0)'
		        	let inner = el.querySelector('.inner')
		        	inner.style.webkitTransform = 'translate3d(0,0,0)'
		        	inner.style.transform = 'translate3d(0,0,0)'
		      	})
			},
			afterEnter(el){
				 let ball = this.dropBalls.shift()
			      if (ball) {
			        ball.show = false
			        el.style.display = 'none'
			      }
			},
			_initBetterScroll(){
				this.scroll= new BScroll(this.$refs.cartList, {
				        click: true
				      });
			},
			listToggle(){
				if(!this.selectedFood.length){
					return false;
				}
				this.cartListShow = !this.cartListShow;
				if(this.cartListShow){
					this.$nextTick(()=>{
						if(!this.scroll){
							this._initBetterScroll();
						}else{
							this.scroll.refresh();
						}
					})
				}
			}
		},
		components:{
			cartcontrol
		}
	}
</script>
<style lang="less" scoped>
	#shoppingCar{
		position: fixed;
		bottom:0;
		left:0;
		z-index: 50;
		width:100%;
		height:90px;
		.carContent{
			background: #141d27;
			display: flex;
			#leftContent{
				flex:1;
				&>div{
					display: inline-block;
				}
				.carWrapper{
					width:112px;
					height: 112px;
					border-radius:50%;
					background-color:#141d27;
					position:relative;
					top:-22px;
					left:30px;
					padding: 12px;
					.icon-content{
						width:88px;
						height: 88px;
						border-radius:50%;
						background-color:#2b343c;
						font-size:48px;
						line-height:88px;
						color:#80858a;
						text-align:center;
						&.selectedActive{
							background: #00a0dc;
			    			color: #fff;
						}
					}
					.tip{
						position: absolute;
						top:-4px;
						right:-2px;
						width:48px;
						height: 32px;
						line-height:32px;
						background-color:rgb(240,20,20);
						box-shadow:0px 4px 8px 0px rgba(0,0,0,.4);
						font-size:20px;/*px*/
						color:rgb(255,255,255);
						font-weight:700;
						border-radius:24px;
						text-align:center;
					}
				}
				.price{
					font-size:32px;/*px*/
					color:rgba(255,255,255,.4);
					font-weight:700;
					border-right: 1px solid rgba(255,255,255,0.1);/*no*/
					padding:0px 24px 0 36px;
					vertical-align: top;
					height: 50px;
					line-height:50px;
					margin-top:20px;
				}
				.needPrice{
					font-size:24px;/*px*/
					color:rgba(255,255,255,.4);
					font-weight:700;
					line-height:90px;
					height:90px;
					vertical-align: top;
					margin-left:24px;
				}
			}
			#rightContent{
				font-size:24px;/*px*/
				color:rgba(255,255,255,.4);
				font-weight:700;
				line-height:90px;
				padding:0 16px;
				width:210px;
				background: #2b343c;
				text-align:center;
				&.enough{
					background: #00b43c;
    				color: #fff;
				}
			}
		}
		
		.balls{
			position: fixed;
		    left: 64px;
		    bottom: 44px;
		    z-index: 200;
		    transition:all 0.4s linear;
		    &.drop-enter,&.drop-enter-active{
		    	transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
		    }
			.inner{
				width:26px;
				height: 26px;
				background-color:rgb(0,160,220);
				border-radius:50%;
				transition:all 0.4s linear;
			}
		}
		#cartList{
			position:absolute;
			top:0;
			left:0px;
			z-index:-1;
			width:100%;
			background: #fff;
		    transform: translate3d(0, -100%, 0);
		    &.cartList-enter-active,&.cartList-leave-active{
		    	transition: all .5s;
		    }
		    &.cartList-enter,&.cartList-leave-active{
		    	transform: translate3d(0, 0, 0);
		    }
			.listHeader{
				height: 80px;
				line-height:80px;
				background-color:#f3f5f7;
				display:flex;
				.leftContent{
					color:rgb(7,17,27);
					font-size:28px;/*px*/
					font-weight:200;
					text-align:left;
					flex:1;
					padding-left:36px;
				}
				.rightContent{
					font-size:24px;/*px*/
					color:rgb(0,160,220);
					text-align:right;
					flex:1;
					padding-right:36px;
				}
			}
			.cartsContent{
				max-height:400px;
				overflow: hidden;
				li{
					height: 96px;
					display: flex;
					line-height:96px;
					padding:0 36px;
					.items-name{
						flex:1;
						color:#07111b;
						font-size:28px;/*px*/
						font-weight: 700;
					}
					.items-price{
						padding:0 24px 0 36px;
						font-size:28px;/*px*/
						font-weight: normal;
						color:rgb(240,20,20);
					}
					.cartcontrol{
						margin-top:26px;
					}
				}
			}
		}
	}
	#overlay{
			position:fixed;
			top:0;
			left:0;
			right:0;
			bottom:0;
			background-color:rgba(7,17,27,.6);
			z-index:40;
    		backdrop-filter: blur(10px);
			&.discover-enter-active,&.discover-leave-active{
				transition: opacity .5s;
			}
			&.discover-enter,&.discover-leave-active{
				opacity:0;
			}
		}
</style>