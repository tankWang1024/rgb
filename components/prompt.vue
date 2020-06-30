<!-- prompt组件 -->
<!-- prompt -->
<template>
	<view class="prompt-box" :hidden="isHidden">
		<view class="prompt-content">
			<view class="prompt-title-box">
				<view class="prompt-title">
					{{title}}
				</view>
				<image class="prompt-img" src="../static/shut.svg" @tap="_cancel"></image>
			</view>
			<!-- <view class="prompt-text">{{text}}</view> -->
			<view class="form">
				<input type="number" class="prompt-input" @input="_input" :value="cost" />
				<view class="img-box">
					<image src="../static/up.svg" class="form-img up" @tap="add"></image>
					<image src='../static/down.svg' class="form-img down" @tap="incre"></image>
				</view>
			</view>
			<button class="prompt-certain-btn" @tap="_confirm">{{btn_certain}}</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				multipleSlots: true, // 在组件定义时的选项中启用多slot支持
				isHidden: true,
				cost: ''
			};
		},
		props: {
			title: {
				type: String,
				default: '提示'
			},
			btn_cancel: {
				type: String,
				default: '取消'
			},
			btn_certain: {
				type: String,
				default: '确定'
			},
			text: {
				type: String,
				default: '',
			}
		},
		watch: {
			
		},
		methods: {

			isNum(n) {
				if (isNaN(n) || n === '') {
					return 0
				} else if (n <= 0) {
					return 1
				} else {
					return 2
				}
			},
			add() {
				if (this.isNum(this.cost)) {
					this.cost = Number(this.cost) + 1
				}else{
					this.cost = 0
				}
			},
			incre() {
				if (this.isNum(this.cost) == 2) {
					if(this.cost - 1 >= 0){
						this.cost = Number(this.cost) - 1
					}
				}
			},
			hide: function() {
				this.isHidden = true;
			},
			show(e) {
				this.isHidden = false;
				if (e != null && e != undefined && e != "") {
					this.text = e;
				}
			},
			/*
			 * 内部私有方法建议以下划线开头
			 * triggerEvent 用于触发事件
			 */
			_cancel() {
				//触发cancel事件，即在外部，在组件上绑定cancel事件即可，bind:cancel，像绑定tap一样
				// this.cost = '';
				this.hide();
				this.$emit('onCancel');
			},
			_confirm() {
				//this.triggerEvent("confirm");
				this.$emit('onConfirm', this.cost);
				// this.cost = '';
			},
			_input(e) {
				//将参数传出去，这样在getInput函数中可以通过e去获得必要的参数
				//this.triggerEvent("getInput",e.detail);
				this.cost = e.detail.value;
			}
		}
	}
</script>

<style>
	/* components/vas-prompt/vas-prompt.wxss */
	.prompt-box {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 11;
		background: rgba(0, 0, 0, 0.5);
		/* opacity: .85; */
	}

	.prompt-content {
		position: absolute;
		left: 50%;
		top: 40%;
		width: 80%;
		max-width: 600rpx;
		padding: 0 80rpx 40rpx;
		box-sizing: border-box;
		border: 2rpx solid rgb(210, 210, 210);
		border-radius: 20rpx;
		box-sizing: bordre-box;
		transform: translate(-50%, -50%);
		overflow: hidden;
		background: #fff;
	}

	.prompt-title-box {
		width: 100%;
		height: 140rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx solid rgb(210, 210, 210);
	}

	.prompt-title {
		font-size: 40rpx;
		color: #000000;
	}

	.prompt-img {
		width: 40rpx;
		height: 40rpx;
		box-sizing: border-box;
		margin: 0;
	}

	.form {
		display: flex;
		align-items: center;
	}

	.prompt-input {
		padding: 10rpx 20rpx;
		width: 60%;
		height: 80rpx;
		border: 1px solid rgb(210, 210, 210);
		border-radius: 20rpx;
		margin: 40rpx 0;
	}

	.form-img {
		width: 60rpx;
		height: 50rpx;
		box-sizing: border-box;
		border: 1px solid rgb(210, 210, 210);
	}

	.img-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: -60rpx;
	}

	.up {
		border-radius: 0 20rpx 0 0;
	}

	.down {
		border-radius: 0 0 20rpx 0;
	}

	.prompt-certain-btn {
		width: 100%;
		box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.2), 0 12rpx 40rpx 0 rgba(0, 0, 0, 0.19);
		background-color: rgb(255, 196, 62);
	}

	.prompt-text {
		margin-top: 15rpx;
		font-size: 38rpx;
	}
</style>
