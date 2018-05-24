<template>
	<div class="goods">
		<div class="menuWrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" @click="selectNode(index)" :class="index===menuCurrentIndex?'menu-item-selected':''">
					<p class="goods-name">
						<span v-if="item.type>=0" class="menu-icon" :class="item.type<0?'':classMap[item.type]"></span>{{item.name}}
					</p>
				</li>
			</ul>
		</div>
		<div class="goodsWrapper" ref="goodsWrapper">
			<ul ref="goodList">
				<li v-for="good in goods" class="good-item">
					<p class="menu-title">{{good.name}}</h3>
					<div v-for="food in good.foods" class="food-item" @click="selectFood(food)">
						<div class="food-icon">
							<img :src="food.icon" alt=""/>
						</div>
						<div class="foodWrapper">
							<p>{{food.name}}</p>
							<p>{{food.description}}</p>
							<p>月售{{food.sellCount}}份 <span style="margin-left:24px;">好评率{{food.rating}}%</span></p>
							<p>
								<label>￥</label><span>{{food.price}}</span>
								<label v-if="food.oldPrice">￥</label><span v-if="food.oldPrice">{{food.oldPrice}}</span>
							</p>
							<div class="cartControlWrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</div>
					</div>
					
				</li>
			</ul>
		</div>
	<shoppingCar :selectedFood="selectedFood" :minPrice="this.seller.minPrice"></shoppingCar>
	<goodsDesc :food="selectedTarget" v-if="selectedTarget" ref="foodDetails"></goodsDesc>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import shoppingCar from '@/components/shoppingCar/shoppingCar'
import cartcontrol from '@/components/common/cartcontrol'
import goodsDesc from '@/components/goods/goodsDesc'
	export default{
		data(){
			return {
				goods:[],
				classMap :['decrease', 'discount', 'special', 'invoice', 'guarantee'],
				listHeight:[],
				scrollY:0,
				selectedTarget:''
			}
		},
		props:{
			seller:{
				type: Object
			}
		},
		created(){
			var $this=this;
			$this.$axios.get("/api/goods").then(function(resp){
				$this.goods=resp.data.data;
				$this.$nextTick(() => {
		        	$this._initScroll(); // 初始化scroll
		        	$this._calculateHeight();
		      })
			})
		},
		components:{
			shoppingCar,
			cartcontrol,
			goodsDesc
		},
		computed:{
			menuCurrentIndex(){
				for(let i=0,len=this.listHeight.length;i<len;i++){
					let prev=this.listHeight[i];
					let next=this.listHeight[i+1];
					if(!next || (this.scrollY>=prev && this.scrollY < next)){
						return i;
					}
				}
				return 0;
			},
			selectedFood(){
				let arr=[];
				this.goods.forEach((good)=> {
					good.foods.forEach((food)=>{
						if(food.count){
							arr.push(food);
						}
					})
				});
				return arr;
			}
		},
		methods:{
			_calculateHeight(){
				let foodList = this.$refs.goodList.querySelectorAll(".good-item");//查找出所有的食品元素
				let height = 0;
				this.listHeight.push(0);
				for(let i=0,len=foodList.length;i<len;i++){
					height += foodList[i].clientHeight;
					this.listHeight.push(height);
				}
			},
			_initScroll(){
				if(!this.menuWrapper){
					this.menuWrapper= new BScroll(this.$refs.menuWrapper, {
				        click: true
				      });
				}else{
					this.menuWrapper.refresh();
				}
				if(!this.goodWrapper){
					this.goodWrapper= new BScroll(this.$refs.goodsWrapper, {
				        click: true,
				        probeType: 3
				      });
					// 监控食品列表滚动事件
			      this.goodWrapper.on('scroll', (pos) => {
			        this.scrollY = Math.abs(Math.round(pos.y))
			      })
				}else{
					this.menuWrapper.refresh();
				}
				
			},
			selectNode(index){
				//this.menuCurrentIndex=index;
				//var target= this.$refs.goodList.querySelector(`li:nth-child(${index+1})`);
				//this.goodWrapper.scrollToElement(target,300);
				this.goodWrapper.scrollTo(0, -this.listHeight[index], 300)
			},
			selectFood(food){
				this.selectedTarget=food;
				this.$nextTick(() => {
			       this.$refs.foodDetails.detailsToggle();
			    })
			}
		}
	}
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
	.goods{
		display:flex;
		position: absolute;
	    top: 348px;
	    bottom: 110px;
	    width: 100%;
	    overflow: hidden;
		border-top:1px solid rgba(7,17,27,0.5);/*no*/
		.menuWrapper{
			width:160px;
			background-color:#f3f5f7;
			.menu-item{
				width:100%;
				height: 109px;
				display:table;
				padding:0 24px;
				&.menu-item-selected{
					background-color:#fff;
				}
				.goods-name{
					display:table-cell;
					vertical-align: middle;
					font-size:24px;
					font-weight:200;
					line-height:28px;
				}
				.menu-icon{
					width:26px;
					height:26px;
					vertical-align: top;
					margin-right:6px;
					display: inline-block;
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
		}	
		.goodsWrapper{
			flex:1;
			.good-item{
				.menu-title{
					height: 52px;
					background-color:#f3f5f7;
					color:rgb(147,153,159);
					line-height:52px;
					padding-left:28px;
				}
				.food-item{
					padding:36px;
					border-bottom: 1px solid rgba(7,17,27,0.1);/*no*/
					display: flex;
					.food-icon{
						width:114px;
						height: 114px;
					}
					&:last-child{
						border-bottom: none;
					}
					.foodWrapper{
						flex:1;
						padding: 4px 36px 0px 20px;
						display: inline-block;
						position:relative;
						.cartControlWrapper{
							position:absolute;
							right:0;
							bottom:0;
							z-index:20;
						}
						p:nth-child(1){
							font-size:28px;/*px*/
							color:rgb(7,17,27);
							line-height:28px;
						}
						p:nth-child(2){
							font-size:20px;/*px*/
							color:rgb(147,153,159);
							line-height:20px;
							margin: 18px auto;
						}
						p:nth-child(3){
							font-size:20px;/*px*/
							color:rgb(147,153,159);
							line-height:20px;
						}
						p:nth-child(4){
							margin-top:16px;
							label:nth-of-type(1),span:nth-of-type(1){
								color:#f01414;
							}
							span{
								font-size:28px;/*px*/
								font-weight:700;
								line-height:48px;
							}
							label:nth-of-type(2),span:nth-of-type(2){
								color:rgb(147,153,159);
								text-decoration: line-through;
							}
							label:nth-of-type(2){
								margin-left:16px;
							}
							span:nth-of-type(2){
								font-size:20px;/*px*/
								font-weight:normal;
								line-height:48px;
							}
						}
					}
				}
			}
		}
	}
	
</style>