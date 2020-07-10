<!-- prompt组件 -->
<!-- prompt -->
<template>
	<view class="prompt-box" :hidden="isHidden">
		<view class="prompt-content">
			<view class="prompt-title-box">
				<view class="prompt-title">
					{{title}}
				</view>
			</view>
			<!-- <view class="prompt-text">{{text}}</view> -->
			<view class="form">
				<input class="prompt-input" @input="_input" :value="cost" />
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
				cost: ""
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
			hide: function() {
				this.isHidden = true;
			},
			show(e) {
				this.isHidden = false;
				if (e != null && e != undefined && e != "") {
					this.text = e;
				}
			},
			_confirm() {
				this.$emit('onConfirm', this.cost);
				// this.cost = '';
			},
			_input(e) {
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

	.form {
		display: flex;
		align-items: center;
	}

	.prompt-input {
		padding: 10rpx 20rpx;
		width: 100%;
		height: 80rpx;
		border: 1px solid rgb(210, 210, 210);
		border-radius: 20rpx;
		margin: 40rpx 0;
	}

	.prompt-certain-btn {
		width: 100%;
		/* box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.2), 0 12rpx 40rpx 0 rgba(0, 0, 0, 0.19); */
		background-color: rgb(255, 196, 62);
	}
</style>
