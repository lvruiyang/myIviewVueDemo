<template>
	<div class="star" :class="starType">
		<div v-for="star in starArray" class="star-item" track-by="$index">
			<span class="littleStar" :class="star"></span>
		</div>
	</div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
	export default{
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType() {
		      return 'star-' + this.size;
		    },
		    starArray(){
		    	let startCount=[];
		    	let score=Math.floor(this.score*2)/2;
		    	let hasDecimal=score %1 !=0;
		    	let starInteger=Math.floor(score);
		    	while(starInteger--){
		    		startCount.push(CLS_ON);
		    	}
		    	if(hasDecimal){
		    		startCount.push(CLS_HALF);
		    	}
		    	while(startCount.length < LENGTH){
		    		startCount.push(CLS_OFF);
		    	}
		    	return startCount;
		    }
		}
	}
</script>
<style scoped lang="less">
@import '../../common/less/mixin.less';
	.starItem(@size){
		width:19%;
		.littleStar{
			display: inline-block;
			width: @size*1px;
			height: @size*1px;
			&.on{
	          .bg-image('star@{size}_on');
			}
	        &.half{
	          .bg-image('star@{size}_half');
	        }
	        &.off{
	          .bg-image('star@{size}_off');
	        }
		}
	}
	.star{
		display:flex;
		justify-content: space-between;
		 &.star-48{
		 	.star-item{
				.starItem(48);
		 	}
		 }
		&.star-36{
		 	.star-item{
				.starItem(36);
		 	}
		 }
		 &.star-24{
		 	.star-item{
				.starItem(24);
		 	}
		 }
	}
</style>