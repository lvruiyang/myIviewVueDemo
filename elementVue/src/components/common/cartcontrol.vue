<template>
	<div class="cartControl">
		<transition name="cart">
			<div class="cartItems" v-show="food.count>0" @click.stop.prevent="reduceCart()"><span class="icon-remove_circle_outline inner"></span></div>
		</transition>
		<div class="cartItems" v-show="food.count>0">{{food.count}}</div>
		<div class="cartItems" @click.stop.prevent="addCart($event)"><i class="icon-add_circle"></i></div>
	</div>	
</template>

<script>
	export default{
		name:'cartcontrol',
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(event){
				if (!event._constructed) {
			        return
			      }
				if(!this.food.count){
					this.$set(this.food,'count',1)
				}else{
					this.food.count+=1;
				}
				this.$root.eventHub.$emit('cart.add', event.target)
			},
			reduceCart(){
				 if (!event._constructed || !this.food.count) {
			        return
			      }
				this.food.count-=1;
			}
		}
	}
</script>

<style lang="less" scoped>
	.cartControl{
		display: flex;
		.cartItems{
			width:48px;
			height: 48px;
			line-height: 48px;
			transition:all 0.4s linear;
			&:nth-child(1),&:nth-child(3){
				color: rgb(0,160,220);
				font-size: 48px;/*px*/
			}
			&:nth-child(1)&.cart-enter-active,&.cart-leave-active{
				transform:translate3d(0,0,0);
				.inner{
					transform: rotate(0deg);
				}
			}
			&.cart-enter,&.cart-leave-active{
				opacity: 0;
	      		transform:translate3d(24px,0,0);
				.inner{
					transform: rotate(180deg);
				}

			}
			&:nth-child(2){
				width:48px;
				height: 48px;
				color:rgb(147,153,159);
				font-size: 26px;/*px*/
				text-align:center;
			}
			.inner{
				transition: all .4s linear;
			}
		}
	}
</style>